import * as ligasRepository from "../repositories/ligas.repository.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return ligasRepository.findAll();
}

function findById(id) {
    const liga = ligasRepository.findById(id);

    if (!liga) {
        throw new AppError(404, `No existe la liga con id ${id}`);
    }

    return liga;
}

export { findAll, findById };
