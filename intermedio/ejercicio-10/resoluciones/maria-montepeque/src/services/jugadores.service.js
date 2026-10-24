import { jugadores } from "../data/db.js";
import AppError from "../utils/app-error.js";
import sortBy from "../utils/sort-by.js";

const SORTABLE_FIELDS = ["name", "ranking", "wins"];

function findAll(query = {}) {
    return sortBy(jugadores, query.sort, SORTABLE_FIELDS);
}

function findById(id) {
    const jugador = jugadores.find((jugador) => jugador.id === id);

    if (!jugador) {
        throw new AppError(404, `No existe el jugador con id ${id}`);
    }

    return jugador;
}

export { findAll, findById };
