import catchAsync from "../utils/catch-async.js";
import * as torneosService from "../services/torneos.service.js";

const listTorneos = catchAsync(async (req, res) => {
    const data = torneosService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getTorneo = catchAsync(async (req, res) => {
    const torneo = torneosService.findById(Number(req.params.id));
    res.json({ ok: true, data: torneo });
});

export { listTorneos, getTorneo };
