const CATEGORIES = ["frenos", "motor", "suspension", "electrico"];

const repuestoSchema = {
    name: { type: "string", required: true },
    category: { type: "string", required: true, enum: CATEGORIES },
    price: { type: "number", required: true, min: 0 }
};

export default repuestoSchema;
