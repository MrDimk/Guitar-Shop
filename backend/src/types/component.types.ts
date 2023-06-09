export const Component = {
    Application: Symbol.for('Application'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    ConfigInterface: Symbol.for('ConfigInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
    UserServiceInterface: Symbol.for('UserServiceInterface'),
    UserModel: Symbol.for('UserModel'),
    UserController: Symbol.for('UserController'),
    ProductServiceInterface: Symbol.for('ProductServiceInterface'),
    ProductModel: Symbol.for('ProductModel'),
    ProductController: Symbol.for('ProductController'),
    ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
} as const;
