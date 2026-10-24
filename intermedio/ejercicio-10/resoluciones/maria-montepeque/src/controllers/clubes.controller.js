import catchAsync from "../utils/catch-async.js";
import * as clubesService from "../services/clubes.service.js";

const listClubes = catchAsync(async (req, res) => {
    const data = clubesService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getClub = catchAsync(async (req, res) => {
    const club = clubesService.findById(Number(req.params.id));
    res.json({ ok: true, data: club });
});

export { listClubes, getClub };
