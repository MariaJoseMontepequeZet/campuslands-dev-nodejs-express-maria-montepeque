import { motos } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return motos;
}

function findById(id) {
    const moto = motos.find((moto) => moto.id === id);

    if (!moto) {
        throw new AppError(404, `No existe la moto con id ${id}`);
    }

    return moto;
}

function create(body) {
    const lastId = motos.reduce((max, moto) => Math.max(max, moto.id), 0);

    const moto = {
        id: lastId + 1,
        brand: body.brand.trim(),
        model: body.model.trim(),
        cc: body.cc,
        year: body.year
    };

    motos.push(moto);
    return moto;
}

export { findAll, findById, create };
