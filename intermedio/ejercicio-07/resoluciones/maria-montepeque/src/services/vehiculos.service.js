import { vehiculos } from "../data/db.js";
import NotFoundError from "../errors/not-found-error.js";

function findAll() {
    return vehiculos;
}

function findById(id) {
    const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === id);

    if (!vehiculo) {
        throw new NotFoundError(`No existe el vehiculo con id ${id}`);
    }

    return vehiculo;
}

export { findAll, findById };
