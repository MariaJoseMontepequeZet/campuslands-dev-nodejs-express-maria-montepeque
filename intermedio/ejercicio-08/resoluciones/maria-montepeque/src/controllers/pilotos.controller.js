import catchAsync from "../utils/catch-async.js";
import * as pilotosService from "../services/pilotos.service.js";

const listPilotos = catchAsync(async (req, res) => {
    const data = pilotosService.findAll();
    res.json({ ok: true, requestId: req.id, total: data.length, data });
});

const getPiloto = catchAsync(async (req, res) => {
    const piloto = pilotosService.findById(Number(req.params.id));
    res.json({ ok: true, requestId: req.id, data: piloto });
});

export { listPilotos, getPiloto };
