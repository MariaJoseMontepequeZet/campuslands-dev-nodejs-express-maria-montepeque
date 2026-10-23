import catchAsync from "../utils/catch-async.js";
import * as talleresService from "../services/talleres.service.js";

const listTalleres = catchAsync(async (req, res) => {
    const data = talleresService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getTaller = catchAsync(async (req, res) => {
    const taller = talleresService.findById(Number(req.params.id));
    res.json({ ok: true, data: taller });
});

export { listTalleres, getTaller };
