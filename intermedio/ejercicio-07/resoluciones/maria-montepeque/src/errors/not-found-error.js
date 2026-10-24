import AppError from "./app-error.js";

class NotFoundError extends AppError {
    constructor(message) {
        super(404, message);
    }
}

export default NotFoundError;
