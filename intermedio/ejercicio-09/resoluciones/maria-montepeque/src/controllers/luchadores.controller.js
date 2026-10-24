import catchAsync from "../utils/catch-async.js";
import * as luchadoresService from "../services/luchadores.service.js";

const listLuchadores = catchAsync(async (req, res) => {
    const { data, meta } = luchadoresService.findAll(req.query);
    res.json({ ok: true, meta, data });
});

const getLuchador = catchAsync(async (req, res) => {
    const luchador = luchadoresService.findById(Number(req.params.id));
    res.json({ ok: true, data: luchador });
});

export { listLuchadores, getLuchador };
