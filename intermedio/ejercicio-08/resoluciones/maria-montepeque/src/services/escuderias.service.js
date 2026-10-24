import { escuderias } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return escuderias;
}

function findById(id) {
    const escuderia = escuderias.find((escuderia) => escuderia.id === id);

    if (!escuderia) {
        throw new AppError(404, `No existe la escuderia con id ${id}`);
    }

    return escuderia;
}

export { findAll, findById };
