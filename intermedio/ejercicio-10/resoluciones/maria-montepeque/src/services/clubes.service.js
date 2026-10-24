import { clubes } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return clubes;
}

function findById(id) {
    const club = clubes.find((club) => club.id === id);

    if (!club) {
        throw new AppError(404, `No existe el club con id ${id}`);
    }

    return club;
}

export { findAll, findById };
