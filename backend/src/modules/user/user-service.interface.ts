import {CreateUserDTO} from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import {LoginUserDto} from './dto/login-user.dto.js';

export interface UserServiceInterface extends DocumentExistsInterface{
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(userEmail: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
