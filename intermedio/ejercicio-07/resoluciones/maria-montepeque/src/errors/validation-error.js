import AppError from "./app-error.js";

class ValidationError extends AppError {
    constructor(errors) {
        super(400, "Datos invalidos", errors);
    }
}

export default ValidationError;
