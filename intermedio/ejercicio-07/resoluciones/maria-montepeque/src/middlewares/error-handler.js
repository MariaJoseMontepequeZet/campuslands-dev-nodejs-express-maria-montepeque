// unico lugar que arma la respuesta de error, sin importar de donde vino
function errorHandler(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const body = {
        ok: false,
        message: error.statusCode ? error.message : "Error interno del servidor"
    };

    if (error.errors && error.errors.length > 0) {
        body.errors = error.errors;
    }

    if (!error.statusCode) {
        console.error(error.stack);
    }

    res.status(statusCode).json(body);
}

export default errorHandler;
