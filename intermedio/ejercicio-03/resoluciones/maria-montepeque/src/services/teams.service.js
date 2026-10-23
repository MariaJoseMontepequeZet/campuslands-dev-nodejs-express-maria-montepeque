import { teams } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return teams;
}

function findById(id) {
    const team = teams.find((team) => team.id === id);

    if (!team) {
        throw new AppError(404, `No existe el equipo con id ${id}`);
    }

    return team;
}

export { findAll, findById };
