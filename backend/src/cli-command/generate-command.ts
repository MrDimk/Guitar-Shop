import {CliCommandInterface} from './cli-command.interface.js';
import {Product} from '../types/product.type.js';
import {nanoid} from 'nanoid';
import {TsvFileReader} from '../common/file-reader/tsv-file-reader.js';
import dayjs from 'dayjs';
import {GuitarType} from '../types/guitar-type.enum.js';
import {getRandomElement, getRandomInt} from '../utils/utils.js';
import {LoggerService} from '../common/logger/logger.service.js';
import {ProductService} from '../modules/product/product.service.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {UserEntity, UserModel} from '../modules/user/user.entity.js';
import {ProductModel} from '../modules/product/product.entity.js';
import {UserService} from '../modules/user/user.service.js';
import {DatabaseService} from '../common/database-client/database.service.js';
import {ConfigService} from '../common/config/config.service.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {getURI} from '../utils/db.js';
import {CreateUserDTO} from '../modules/user/dto/create-user.dto.js';

// const DEFAULT_DB_PORT = 27017;
const DEFAULT_ADMIN_USER = {name: 'admin', password: 'admin', email: 'admin@admin.com'};
const DEFAAULT_MOCK_CSV_FILEPATH = './mocks/mock-data.tsv';

export class GenerateCommand implements CliCommandInterface {
    public readonly name = '--generate';
    private readonly logger = new LoggerService();
    private readonly productService = new ProductService(ProductModel, this.logger);
    private readonly userService = new UserService(this.logger, UserModel);
    private readonly databaseService: DatabaseInterface;
    private readonly config: ConfigInterface;

    constructor() {
        this.databaseService = new DatabaseService(this.logger);
        this.config = new ConfigService(this.logger);
    }

    private async saveProduct(product: Product) {
        console.log('Product trying to save...!!!');
        await this.productService.create(product);
    }

    public async execute() {
        const salt = this.config.get('SALT');
        // const port = this.config.get('DB_PORT') || DEFAULT_DB_PORT;

        // const uri = getURI(login, password, port, host, dbname);
        const uri = getURI(
            this.config.get('DB_USER'),
            this.config.get('DB_PASSWORD'),
            this.config.get('DB_PORT'),
            this.config.get('DB_HOST'),
            this.config.get('DB_NAME'),
        );

        await this.databaseService.connect(uri);
        await this.createDefaultAdmin(DEFAULT_ADMIN_USER, salt);

        await this.loadData(DEFAAULT_MOCK_CSV_FILEPATH);
        this.logger.info('File readed.');
        this.databaseService.disconnect();
    }

    private async createDefaultAdmin(dto: CreateUserDTO, salt: string): Promise<UserEntity> {
        return this.userService.findOrCreate(dto, salt);
    }

    private async loadData(filename: string): Promise<void> {
        const fileReader = new TsvFileReader(filename.trim());
        fileReader.on('line', this.onLine);
        fileReader.on('end', this.onComplete);
        try {
            await fileReader.read();
        } catch (error) {
            console.log(`Не удалось импортировать данные из файла, ошибка: "${error}"`);
        }
    }

    private onLine = (line: string, resolve: () => void) => {
        const product = this.createProduct(line);
        this.saveProduct(product);
        // console.log(product);
        // await this.saveMovie(movie);
        // this.logger.info(`Movie "${movie.title}" saved in DB.`);
        resolve();
    }

    private onComplete = (count: number) => {
        this.logger.info(`${count} rows imported.`);
        // this.databaseService.disconnect();
    }

    private createProduct = (line: string): Product => {
        const tokens = line.replace('\n', '')
            .replace(`"`, '').split('\t');
        const [title, description, photo, type] = tokens;
        let guitarType = GuitarType.Acoustic;
        let stringCount = 0;

        switch (type) {
            case GuitarType.Electric:
                guitarType = GuitarType.Electric;
                stringCount = getRandomElement([4, 6, 7]);
                break;
            case GuitarType.Acoustic:
                guitarType = GuitarType.Acoustic;
                stringCount = getRandomElement([6, 7, 12]);
                break;
            case GuitarType.Ukulele:
                guitarType = GuitarType.Ukulele;
                stringCount = 4;
                break;
        }

        return {
            id: nanoid(),
            title, description, photo, guitarType,
            addedDate: dayjs().toDate(),
            article: `${type}-${nanoid(5)}`,
            stringCount,
            price: getRandomInt(100, 1000000)
        }
    }
}
