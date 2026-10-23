import { weapons } from "../data/db.js";

function findAll() {
    return weapons;
}

function findById(id) {
    return weapons.find((weapon) => weapon.id === id);
}

export { findAll, findById };
