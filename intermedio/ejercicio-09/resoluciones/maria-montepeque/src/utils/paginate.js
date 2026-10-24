// recorta el arreglo ya filtrado y arma los metadatos de la pagina
function paginate(records, { page, limit }) {
    const total = records.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const start = (page - 1) * limit;
    const data = records.slice(start, start + limit);

    return {
        data,
        meta: { page, limit, total, totalPages }
    };
}

export default paginate;
