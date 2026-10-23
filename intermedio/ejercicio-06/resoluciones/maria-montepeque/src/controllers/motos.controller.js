import catchAsync from "../utils/catch-async.js";
import * as motosService from "../services/motos.service.js";

const listMotos = catchAsync(async (req, res) => {
    const data = motosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getMoto = catchAsync(async (req, res) => {
    const moto = motosService.findById(Number(req.params.id));
    res.json({ ok: true, data: moto });
});

const createMoto = catchAsync(async (req, res) => {
    const moto = motosService.create(req.body);
    res.status(201).json({ ok: true, data: moto });
});

export { listMotos, getMoto, createMoto };
