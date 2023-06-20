import {Expose} from 'class-transformer';

export class UploadPhotoRdo {
    @Expose()
    public photo!: string;
}
