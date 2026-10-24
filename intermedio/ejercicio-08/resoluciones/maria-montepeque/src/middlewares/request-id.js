import { randomUUID } from "node:crypto";

// si el cliente ya mando un id lo respeta, si no genera uno nuevo
function requestId(req, res, next) {
    req.id = req.get("X-Request-Id") || randomUUID();
    res.set("X-Request-Id", req.id);
    next();
}

export default requestId;
