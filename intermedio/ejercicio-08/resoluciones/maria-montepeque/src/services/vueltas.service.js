import { vueltas, pilotos } from "../data/db.js";
import AppError from "../utils/app-error.js";

function findAll() {
    return vueltas;
}

function validate(body = {}) {
    const errors = [];

    if (typeof body.pilotoId !== "number") {
        errors.push("pilotoId es obligatorio y debe ser un numero");
    }

    if (typeof body.circuit !== "string" || body.circuit.trim() === "") {
        errors.push("circuit es obligatorio");
    }

    if (typeof body.timeSeconds !== "number" || body.timeSeconds <= 0) {
        errors.push("timeSeconds debe ser un numero mayor a 0");
    }

    return errors;
}

function create(body = {}) {
    const errors = validate(body);

    if (errors.length > 0) {
        throw new AppError(400, "Datos invalidos", errors);
    }

    const piloto = pilotos.find((piloto) => piloto.id === body.pilotoId);

    if (!piloto) {
        throw new AppError(404, `No existe el piloto con id ${body.pilotoId}`);
    }

    const lastId = vueltas.reduce((max, vuelta) => Math.max(max, vuelta.id), 0);

    const vuelta = {
        id: lastId + 1,
        pilotoId: body.pilotoId,
        circuit: body.circuit.trim(),
        timeSeconds: body.timeSeconds
    };

    vueltas.push(vuelta);
    return vuelta;
}

export { findAll, create };
