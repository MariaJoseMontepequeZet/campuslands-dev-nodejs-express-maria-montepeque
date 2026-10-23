import { Router } from "express";
import validate from "../middlewares/validate.js";
import repuestoSchema from "../schemas/repuesto.schema.js";
import { listRepuestos, getRepuesto, createRepuesto } from "../controllers/repuestos.controller.js";

const router = Router();

router.get("/", listRepuestos);
router.get("/:id", getRepuesto);
router.post("/", validate(repuestoSchema), createRepuesto);

export default router;
