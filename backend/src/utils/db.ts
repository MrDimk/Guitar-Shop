export const getURI = (
    username: string,
    password: string,
    port: number,
    host: string,
    databaseName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
