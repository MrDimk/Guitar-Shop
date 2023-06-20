import * as crypto from 'crypto';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import * as jose from 'jose';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.const.js';

export function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createSHA256 = (line: string, salt: string): string => {
    const shaHasher = crypto.createHmac('sha256', salt);
    return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
    plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
    error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
    new jose.SignJWT({...payload})
        .setProtectedHeader({ alg: algoritm})
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
    property: string,
    someObject: UnknownObject,
    transformFn: (object: UnknownObject) => void
) => {
    Object.keys(someObject)
        .forEach((key) => {
            if (key === property) {
                transformFn(someObject);
            } else if (isObject(someObject[key])) {
                transformProperty(property, someObject[key] as UnknownObject, transformFn);
            }
        });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
    properties
        .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
            const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
            target[property] = `${rootPath}/${target[property]}`;
        }));
};
