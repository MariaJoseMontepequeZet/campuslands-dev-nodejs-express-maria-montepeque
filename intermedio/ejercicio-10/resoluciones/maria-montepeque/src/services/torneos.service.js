import { torneos } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return torneos;
}

function findById(id) {
    const torneo = torneos.find((torneo) => torneo.id === id);

    if (!torneo) {
        throw new AppError(404, `No existe el torneo con id ${id}`);
    }

    return torneo;
}

export { findAll, findById };
