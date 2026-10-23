import catchAsync from "../utils/catch-async.js";
import * as teamsService from "../services/teams.service.js";

const listTeams = catchAsync(async (req, res) => {
    const data = teamsService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getTeam = catchAsync(async (req, res) => {
    const team = teamsService.findById(Number(req.params.id));
    res.json({ ok: true, data: team });
});

export { listTeams, getTeam };
