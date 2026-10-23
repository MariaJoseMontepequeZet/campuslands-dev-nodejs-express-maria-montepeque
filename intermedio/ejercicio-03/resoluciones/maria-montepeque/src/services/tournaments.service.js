import { tournaments } from "../data/db.js";
import AppError from "../utils/app-error.js";

const REGIONS = ["LATAM", "EU", "NA", "APAC"];

function findAll() {
    return tournaments;
}

function findById(id) {
    const tournament = tournaments.find((tournament) => tournament.id === id);

    if (!tournament) {
        throw new AppError(404, `No existe el torneo con id ${id}`);
    }

    return tournament;
}

function create(body = {}) {
    const errors = [];

    if (typeof body.name !== "string" || body.name.trim() === "") {
        errors.push("name es obligatorio");
    }

    if (!REGIONS.includes(body.region)) {
        errors.push(`region debe ser una de: ${REGIONS.join(", ")}`);
    }

    if (typeof body.prizePool !== "number" || body.prizePool < 0) {
        errors.push("prizePool debe ser un numero mayor o igual a 0");
    }

    if (errors.length > 0) {
        throw new AppError(400, "Datos invalidos", errors);
    }

    const lastId = tournaments.reduce((max, tournament) => Math.max(max, tournament.id), 0);

    const tournament = {
        id: lastId + 1,
        name: body.name.trim(),
        region: body.region,
        prizePool: body.prizePool
    };

    tournaments.push(tournament);
    return tournament;
}

export { findAll, findById, create };
