import AppError from "./app-error.js";

class ConflictError extends AppError {
    constructor(message) {
        super(409, message);
    }
}

export default ConflictError;
