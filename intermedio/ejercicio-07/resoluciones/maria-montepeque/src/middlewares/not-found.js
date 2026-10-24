import NotFoundError from "../errors/not-found-error.js";

// se monta al final de las rutas, cualquier ruta que no matcheo cae aqui
function notFound(req, res, next) {
    next(new NotFoundError(`La ruta ${req.originalUrl} no existe`));
}

export default notFound;
