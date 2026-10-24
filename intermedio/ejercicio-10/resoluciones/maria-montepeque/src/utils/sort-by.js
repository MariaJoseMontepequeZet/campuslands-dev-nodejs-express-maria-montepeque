import AppError from "./app-error.js";

// "sort=-wins,name" => primero wins descendente, de empate usa name ascendente
function sortBy(records, sortParam, allowedFields) {
    if (!sortParam) {
        return records;
    }

    const fields = sortParam
        .split(",")
        .map((field) => field.trim())
        .filter(Boolean);

    for (const field of fields) {
        const key = field.replace(/^-/, "");

        if (!allowedFields.includes(key)) {
            throw new AppError(400, `No se puede ordenar por "${key}", usa uno de: ${allowedFields.join(", ")}`);
        }
    }

    const sorted = [...records];

    sorted.sort((a, b) => {
        for (const field of fields) {
            const direction = field.startsWith("-") ? -1 : 1;
            const key = field.replace(/^-/, "");

            if (a[key] < b[key]) return -1 * direction;
            if (a[key] > b[key]) return 1 * direction;
        }

        return 0;
    });

    return sorted;
}

export default sortBy;
