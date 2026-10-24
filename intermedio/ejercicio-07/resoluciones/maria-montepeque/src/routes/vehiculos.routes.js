import { Router } from "express";
import { listVehiculos, getVehiculo } from "../controllers/vehiculos.controller.js";

const router = Router();

router.get("/", listVehiculos);
router.get("/:id", getVehiculo);

export default router;
