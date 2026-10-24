// base de la que cuelgan los errores concretos, todos saben su propio status
class AppError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default AppError;
