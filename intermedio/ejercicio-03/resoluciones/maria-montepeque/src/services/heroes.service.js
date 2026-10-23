import { heroes } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return heroes;
}

function findById(id) {
    const hero = heroes.find((hero) => hero.id === id);

    if (!hero) {
        throw new AppError(404, `No existe el heroe con id ${id}`);
    }

    return hero;
}

export { findAll, findById };
