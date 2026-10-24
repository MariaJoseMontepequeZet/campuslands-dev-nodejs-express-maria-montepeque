import catchAsync from "../utils/catch-async.js";
import * as escuderiasService from "../services/escuderias.service.js";

const listEscuderias = catchAsync(async (req, res) => {
    const data = escuderiasService.findAll();
    res.json({ ok: true, requestId: req.id, total: data.length, data });
});

const getEscuderia = catchAsync(async (req, res) => {
    const escuderia = escuderiasService.findById(Number(req.params.id));
    res.json({ ok: true, requestId: req.id, data: escuderia });
});

export { listEscuderias, getEscuderia };
