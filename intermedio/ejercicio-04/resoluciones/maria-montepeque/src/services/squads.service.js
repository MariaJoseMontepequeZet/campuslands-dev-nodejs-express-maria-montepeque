import { squads } from "../data/db.js";
import createRepository from "./repository.js";
import AppError from "../utils/app-error.js";

const repository = createRepository(squads);

function findAll() {
    return repository.findAll();
}

function findById(id) {
    const squad = repository.findById(id);

    if (!squad) {
        throw new AppError(404, `No existe el escuadron con id ${id}`);
    }

    return squad;
}

export { findAll, findById };
