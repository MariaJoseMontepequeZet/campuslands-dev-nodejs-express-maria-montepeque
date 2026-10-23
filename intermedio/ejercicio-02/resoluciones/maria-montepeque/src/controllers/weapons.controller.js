import * as weaponsService from "../services/weapons.service.js";

function listWeapons(req, res) {
    const data = weaponsService.findAll();
    res.json({ ok: true, total: data.length, data });
}

function getWeapon(req, res) {
    const weapon = weaponsService.findById(Number(req.params.id));

    if (!weapon) {
        return res.status(404).json({ ok: false, message: `No existe el arma con id ${req.params.id}` });
    }

    res.json({ ok: true, data: weapon });
}

export { listWeapons, getWeapon };
