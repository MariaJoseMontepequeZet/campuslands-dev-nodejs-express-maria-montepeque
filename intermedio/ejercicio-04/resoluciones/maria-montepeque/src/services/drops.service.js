import { drops } from "../data/db.js";
import createRepository from "./repository.js";
import AppError from "../utils/app-error.js";

const repository = createRepository(drops);

const RARITIES = ["comun", "raro", "epico", "legendario"];

function findAll() {
    return repository.findAll();
}

function findById(id) {
    const drop = repository.findById(id);

    if (!drop) {
        throw new AppError(404, `No existe el drop con id ${id}`);
    }

    return drop;
}

function validate(body = {}) {
    const errors = [];

    if (typeof body.item !== "string" || body.item.trim() === "") {
        errors.push("item es obligatorio");
    }

    if (!RARITIES.includes(body.rarity)) {
        errors.push(`rarity debe ser una de: ${RARITIES.join(", ")}`);
    }

    if (typeof body.zoneId !== "number") {
        errors.push("zoneId es obligatorio y debe ser un numero");
    }

    return errors;
}

function create(body = {}) {
    const errors = validate(body);

    if (errors.length > 0) {
        throw new AppError(400, "Datos invalidos", errors);
    }

    const drop = {
        id: repository.nextId(),
        item: body.item.trim(),
        rarity: body.rarity,
        zoneId: body.zoneId
    };

    return repository.insert(drop);
}

export { findAll, findById, create };
