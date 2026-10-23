// servicio reutilizable: cada recurso lo usa en vez de repetir find/insert
function createRepository(records) {
    function findAll() {
        return records;
    }

    function findById(id) {
        return records.find((record) => record.id === id);
    }

    function nextId() {
        return records.reduce((max, record) => Math.max(max, record.id), 0) + 1;
    }

    function insert(record) {
        records.push(record);
        return record;
    }

    return { findAll, findById, nextId, insert };
}

export default createRepository;
