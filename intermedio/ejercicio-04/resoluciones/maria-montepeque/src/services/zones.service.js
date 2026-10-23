import { zones } from "../data/db.js";
import createRepository from "./repository.js";
import AppError from "../utils/app-error.js";

const repository = createRepository(zones);

function findAll() {
    return repository.findAll();
}

function findById(id) {
    const zone = repository.findById(id);

    if (!zone) {
        throw new AppError(404, `No existe la zona con id ${id}`);
    }

    return zone;
}

export { findAll, findById };
