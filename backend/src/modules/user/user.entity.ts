import {User} from '../../types/user.type.js';
import {defaultClasses, getModelForClass, ModelOptions, prop} from '@typegoose/typegoose';

export interface UserEntity extends defaultClasses.Base {}

@ModelOptions({
    schemaOptions: {
        collection: 'users'
    }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
    @prop({
        unique: true,
        required: true,
        match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    })
        public email!: string;

    @prop({
        required: true,
        minlength: [1, 'Min length for name is 2'],
        maxlength: [15, 'Max length for name is 15']
    })
        public name!: string;
}

export const UserModel = getModelForClass(UserEntity);

