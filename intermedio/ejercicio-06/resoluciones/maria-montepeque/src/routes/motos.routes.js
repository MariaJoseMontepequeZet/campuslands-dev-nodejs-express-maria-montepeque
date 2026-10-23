import { Router } from "express";
import validate from "../middlewares/validate.js";
import motoSchema from "../schemas/moto.schema.js";
import { listMotos, getMoto, createMoto } from "../controllers/motos.controller.js";

const router = Router();

router.get("/", listMotos);
router.get("/:id", getMoto);
router.post("/", validate(motoSchema), createMoto);

export default router;
