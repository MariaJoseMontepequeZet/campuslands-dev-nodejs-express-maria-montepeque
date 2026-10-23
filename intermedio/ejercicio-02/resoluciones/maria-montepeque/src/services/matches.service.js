import { matches } from "../data/db.js";

function findAll() {
    return matches;
}

function findById(id) {
    return matches.find((match) => match.id === id);
}

export { findAll, findById };
