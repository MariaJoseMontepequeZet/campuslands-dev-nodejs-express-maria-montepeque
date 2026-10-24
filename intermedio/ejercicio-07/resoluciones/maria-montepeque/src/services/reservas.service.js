import { reservas, vehiculos } from "../data/db.js";
import NotFoundError from "../errors/not-found-error.js";
import ValidationError from "../errors/validation-error.js";
import ConflictError from "../errors/conflict-error.js";

function findAll() {
    return reservas;
}

function validate(body = {}) {
    const errors = [];

    if (typeof body.vehicleId !== "number") {
        errors.push("vehicleId es obligatorio y debe ser un numero");
    }

    if (typeof body.customerName !== "string" || body.customerName.trim() === "") {
        errors.push("customerName es obligatorio");
    }

    if (typeof body.days !== "number" || body.days < 1) {
        errors.push("days debe ser un numero mayor o igual a 1");
    }

    return errors;
}

function create(body = {}) {
    const errors = validate(body);

    if (errors.length > 0) {
        throw new ValidationError(errors);
    }

    const vehiculo = vehiculos.find((vehiculo) => vehiculo.id === body.vehicleId);

    if (!vehiculo) {
        throw new NotFoundError(`No existe el vehiculo con id ${body.vehicleId}`);
    }

    const yaReservado = reservas.some((reserva) => reserva.vehicleId === body.vehicleId);

    if (yaReservado) {
        throw new ConflictError(`El vehiculo con id ${body.vehicleId} ya tiene una reserva activa`);
    }

    const lastId = reservas.reduce((max, reserva) => Math.max(max, reserva.id), 0);

    const reserva = {
        id: lastId + 1,
        vehicleId: body.vehicleId,
        customerName: body.customerName.trim(),
        days: body.days,
        total: body.days * vehiculo.dailyRate
    };

    reservas.push(reserva);
    return reserva;
}

export { findAll, create };
