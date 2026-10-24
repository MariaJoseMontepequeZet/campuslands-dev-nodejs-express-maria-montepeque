import { categorias } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return categorias;
}

function findById(id) {
    const categoria = categorias.find((categoria) => categoria.id === id);

    if (!categoria) {
        throw new AppError(404, `No existe la categoria con id ${id}`);
    }

    return categoria;
}

export { findAll, findById };
