import { luchadores } from "../data/db.js";
import AppError from "../utils/app-error.js";
import paginate from "../utils/paginate.js";

const MAX_LIMIT = 50;

function parsePagination(query) {
    let page = Number(query.page);
    let limit = Number(query.limit);

    if (!Number.isInteger(page) || page < 1) {
        page = 1;
    }

    if (!Number.isInteger(limit) || limit < 1) {
        limit = 10;
    }

    if (limit > MAX_LIMIT) {
        throw new AppError(400, `limit no puede ser mayor a ${MAX_LIMIT}`);
    }

    return { page, limit };
}

function applyFilters(records, query) {
    let result = records;

    if (query.categoryId !== undefined) {
        const categoryId = Number(query.categoryId);
        result = result.filter((luchador) => luchador.categoryId === categoryId);
    }

    if (query.gymId !== undefined) {
        const gymId = Number(query.gymId);
        result = result.filter((luchador) => luchador.gymId === gymId);
    }

    return result;
}

function findAll(query = {}) {
    const { page, limit } = parsePagination(query);
    const filtered = applyFilters(luchadores, query);

    return paginate(filtered, { page, limit });
}

function findById(id) {
    const luchador = luchadores.find((luchador) => luchador.id === id);

    if (!luchador) {
        throw new AppError(404, `No existe el luchador con id ${id}`);
    }

    return luchador;
}

export { findAll, findById };
