import catchAsync from "../utils/catch-async.js";
import * as squadsService from "../services/squads.service.js";

const listSquads = catchAsync(async (req, res) => {
    const data = squadsService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getSquad = catchAsync(async (req, res) => {
    const squad = squadsService.findById(Number(req.params.id));
    res.json({ ok: true, data: squad });
});

export { listSquads, getSquad };
