import catchAsync from "../utils/catch-async.js";
import * as reservasService from "../services/reservas.service.js";

const listReservas = catchAsync(async (req, res) => {
    const data = reservasService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const createReserva = catchAsync(async (req, res) => {
    const reserva = reservasService.create(req.body);
    res.status(201).json({ ok: true, data: reserva });
});

export { listReservas, createReserva };
