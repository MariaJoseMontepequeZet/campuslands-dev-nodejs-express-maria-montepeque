// usa el id del middleware anterior para que todas las lineas de un mismo
// request se puedan buscar juntas en el log
function requestLogger(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${req.id}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });

    next();
}

export default requestLogger;
