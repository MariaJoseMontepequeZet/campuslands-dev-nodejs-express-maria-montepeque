const clubes = [
    { id: 1, name: "Deportivo Rio", city: "Guatemala", founded: 1998 },
    { id: 2, name: "Atletico Sala", city: "San Jose", founded: 2005 }
];

function findAll() {
    return clubes;
}

function findById(id) {
    return clubes.find((club) => club.id === id);
}

function create(data) {
    const lastId = clubes.reduce((max, club) => Math.max(max, club.id), 0);
    const club = { id: lastId + 1, ...data };

    clubes.push(club);
    return club;
}

function update(id, changes) {
    const club = findById(id);

    if (!club) {
        return null;
    }

    Object.assign(club, changes);
    return club;
}

function remove(id) {
    const index = clubes.findIndex((club) => club.id === id);

    if (index === -1) {
        return false;
    }

    clubes.splice(index, 1);
    return true;
}

export { findAll, findById, create, update, remove };
