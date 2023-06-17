import * as crypto from 'crypto';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import * as jose from 'jose';

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
