import catchAsync from "../utils/catch-async.js";
import * as gimnasiosService from "../services/gimnasios.service.js";

const listGimnasios = catchAsync(async (req, res) => {
    const data = gimnasiosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getGimnasio = catchAsync(async (req, res) => {
    const gimnasio = gimnasiosService.findById(Number(req.params.id));
    res.json({ ok: true, data: gimnasio });
});

export { listGimnasios, getGimnasio };
