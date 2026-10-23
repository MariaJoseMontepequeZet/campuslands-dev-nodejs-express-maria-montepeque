import AppError from "../utils/app-error.js";

// un solo middleware que cualquier ruta usa pasandole su propio schema
function validate(schema) {
    return function (req, res, next) {
        const errors = [];

        for (const [field, rules] of Object.entries(schema)) {
            const value = req.body[field];

            if (rules.required && (value === undefined || value === null)) {
                errors.push(`${field} es obligatorio`);
                continue;
            }

            if (value === undefined) {
                continue;
            }

            if (rules.type === "string") {
                if (typeof value !== "string" || value.trim() === "") {
                    errors.push(`${field} debe ser texto y no puede ir vacio`);
                }
            }

            if (rules.type === "number") {
                if (typeof value !== "number") {
                    errors.push(`${field} debe ser un numero`);
                } else if (rules.min !== undefined && value < rules.min) {
                    errors.push(`${field} debe ser mayor o igual a ${rules.min}`);
                }
            }

            if (rules.enum && !rules.enum.includes(value)) {
                errors.push(`${field} debe ser uno de: ${rules.enum.join(", ")}`);
            }
        }

        if (errors.length > 0) {
            return next(new AppError(400, "Datos invalidos", errors));
        }

        next();
    };
}

export default validate;
