import catchAsync from "../utils/catch-async.js";
import * as repuestosService from "../services/repuestos.service.js";

const listRepuestos = catchAsync(async (req, res) => {
    const data = repuestosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getRepuesto = catchAsync(async (req, res) => {
    const repuesto = repuestosService.findById(Number(req.params.id));
    res.json({ ok: true, data: repuesto });
});

const createRepuesto = catchAsync(async (req, res) => {
    const repuesto = repuestosService.create(req.body);
    res.status(201).json({ ok: true, data: repuesto });
});

export { listRepuestos, getRepuesto, createRepuesto };
