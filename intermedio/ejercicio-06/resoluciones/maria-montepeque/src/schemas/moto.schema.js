const motoSchema = {
    brand: { type: "string", required: true },
    model: { type: "string", required: true },
    cc: { type: "number", required: true, min: 50 },
    year: { type: "number", required: true, min: 1980 }
};

export default motoSchema;
