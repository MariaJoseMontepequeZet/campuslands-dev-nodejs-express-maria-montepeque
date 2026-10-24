import { marcas } from "../data/db.js";
import NotFoundError from "../errors/not-found-error.js";

function findAll() {
    return marcas;
}

function findById(id) {
    const marca = marcas.find((marca) => marca.id === id);

    if (!marca) {
        throw new NotFoundError(`No existe la marca con id ${id}`);
    }

    return marca;
}

export { findAll, findById };
