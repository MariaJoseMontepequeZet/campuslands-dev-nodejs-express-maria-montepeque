import * as clubesRepository from "../repositories/clubes.repository.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return clubesRepository.findAll();
}

function findById(id) {
    const club = clubesRepository.findById(id);

    if (!club) {
        throw new AppError(404, `No existe el club con id ${id}`);
    }

    return club;
}

function validate(body = {}, { partial = false } = {}) {
    const errors = [];

    if (!partial || body.name !== undefined) {
        if (typeof body.name !== "string" || body.name.trim() === "") {
            errors.push("name es obligatorio");
        }
    }

    if (!partial || body.city !== undefined) {
        if (typeof body.city !== "string" || body.city.trim() === "") {
            errors.push("city es obligatorio");
        }
    }

    if (!partial || body.founded !== undefined) {
        if (typeof body.founded !== "number" || body.founded < 1900) {
            errors.push("founded debe ser un numero mayor o igual a 1900");
        }
    }

    return errors;
}

function create(body) {
    const errors = validate(body);

    if (errors.length > 0) {
        throw new AppError(400, "Datos invalidos", errors);
    }

    return clubesRepository.create({
        name: body.name.trim(),
        city: body.city.trim(),
        founded: body.founded
    });
}

function update(id, body) {
    findById(id);

    const errors = validate(body, { partial: true });

    if (errors.length > 0) {
        throw new AppError(400, "Datos invalidos", errors);
    }

    const changes = {};
    if (body.name !== undefined) changes.name = body.name.trim();
    if (body.city !== undefined) changes.city = body.city.trim();
    if (body.founded !== undefined) changes.founded = body.founded;

    return clubesRepository.update(id, changes);
}

function remove(id) {
    findById(id);
    clubesRepository.remove(id);
}

export { findAll, findById, create, update, remove };
