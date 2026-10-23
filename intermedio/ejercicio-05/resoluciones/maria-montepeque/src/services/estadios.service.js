import * as estadiosRepository from "../repositories/estadios.repository.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return estadiosRepository.findAll();
}

function findById(id) {
    const estadio = estadiosRepository.findById(id);

    if (!estadio) {
        throw new AppError(404, `No existe el estadio con id ${id}`);
    }

    return estadio;
}

export { findAll, findById };
