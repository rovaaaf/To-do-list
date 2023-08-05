function restoreFromDB() {
    return JSON.parse(localStorage.getItem('tasks-db') || '[]');
}

function saveToDB(data) {
    localStorage.setItem('tasks-db', JSON.stringify(data));
}

function clearDB() {
    localStorage.removeItem('tasks-db');
    console.log("DB: ", localStorage.getItem('tasks-db'));
}