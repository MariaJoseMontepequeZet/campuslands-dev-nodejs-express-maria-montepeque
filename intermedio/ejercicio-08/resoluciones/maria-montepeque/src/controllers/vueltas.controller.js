import catchAsync from "../utils/catch-async.js";
import * as vueltasService from "../services/vueltas.service.js";

const listVueltas = catchAsync(async (req, res) => {
    const data = vueltasService.findAll();
    res.json({ ok: true, requestId: req.id, total: data.length, data });
});

const createVuelta = catchAsync(async (req, res) => {
    const vuelta = vueltasService.create(req.body);
    res.status(201).json({ ok: true, requestId: req.id, data: vuelta });
});

export { listVueltas, createVuelta };
