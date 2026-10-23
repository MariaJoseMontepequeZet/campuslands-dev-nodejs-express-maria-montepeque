import { repuestos } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return repuestos;
}

function findById(id) {
    const repuesto = repuestos.find((repuesto) => repuesto.id === id);

    if (!repuesto) {
        throw new AppError(404, `No existe el repuesto con id ${id}`);
    }

    return repuesto;
}

function create(body) {
    const lastId = repuestos.reduce((max, repuesto) => Math.max(max, repuesto.id), 0);

    const repuesto = {
        id: lastId + 1,
        name: body.name.trim(),
        category: body.category,
        price: body.price
    };

    repuestos.push(repuesto);
    return repuesto;
}

export { findAll, findById, create };
