import { gimnasios } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return gimnasios;
}

function findById(id) {
    const gimnasio = gimnasios.find((gimnasio) => gimnasio.id === id);

    if (!gimnasio) {
        throw new AppError(404, `No existe el gimnasio con id ${id}`);
    }

    return gimnasio;
}

export { findAll, findById };
