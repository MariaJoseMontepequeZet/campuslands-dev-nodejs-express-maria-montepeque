// error con status propio para que el middleware final sepa que responder
class AppError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default AppError;
