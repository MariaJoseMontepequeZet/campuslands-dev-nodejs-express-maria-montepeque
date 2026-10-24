import { pilotos } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return pilotos;
}

function findById(id) {
    const piloto = pilotos.find((piloto) => piloto.id === id);

    if (!piloto) {
        throw new AppError(404, `No existe el piloto con id ${id}`);
    }

    return piloto;
}

export { findAll, findById };
