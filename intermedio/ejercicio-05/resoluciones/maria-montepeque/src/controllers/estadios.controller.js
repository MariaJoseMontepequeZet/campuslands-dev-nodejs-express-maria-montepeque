import catchAsync from "../utils/catch-async.js";
import * as estadiosService from "../services/estadios.service.js";

const listEstadios = catchAsync(async (req, res) => {
    const data = estadiosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getEstadio = catchAsync(async (req, res) => {
    const estadio = estadiosService.findById(Number(req.params.id));
    res.json({ ok: true, data: estadio });
});

export { listEstadios, getEstadio };
