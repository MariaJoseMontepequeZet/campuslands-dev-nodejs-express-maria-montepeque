// evita repetir try/catch en cada controlador
function catchAsync(handler) {
    return function (req, res, next) {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}

export default catchAsync;
