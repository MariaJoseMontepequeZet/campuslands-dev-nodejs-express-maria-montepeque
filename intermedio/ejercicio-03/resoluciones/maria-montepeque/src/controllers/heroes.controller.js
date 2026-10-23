import catchAsync from "../utils/catch-async.js";
import * as heroesService from "../services/heroes.service.js";

const listHeroes = catchAsync(async (req, res) => {
    const data = heroesService.findAll();
    res.json({ ok: true, total: data.length, data });
});

const getHero = catchAsync(async (req, res) => {
    const hero = heroesService.findById(Number(req.params.id));
    res.json({ ok: true, data: hero });
});

export { listHeroes, getHero };
