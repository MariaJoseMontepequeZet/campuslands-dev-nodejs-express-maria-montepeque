import catchAsync from "../utils/catch-async.js";
import * as ligasService from "../services/ligas.service.js";

const listLigas = catchAsync(async (req, res) => {
    const data = ligasService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getLiga = catchAsync(async (req, res) => {
    const liga = ligasService.findById(Number(req.params.id));
    res.json({ ok: true, data: liga });
});

export { listLigas, getLiga };
