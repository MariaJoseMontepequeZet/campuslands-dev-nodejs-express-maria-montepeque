import { talleres } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return talleres;
}

function findById(id) {
    const taller = talleres.find((taller) => taller.id === id);

    if (!taller) {
        throw new AppError(404, `No existe el taller con id ${id}`);
    }

    return taller;
}

export { findAll, findById };
