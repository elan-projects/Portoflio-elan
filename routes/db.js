const sqlite3  = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..' , 'config' , 'database.db');

const db = new sqlite3.Database(dbPath , (err) => {
    if(err) {
        console.error('Error Connecting to database ' ,err.message);
    }else {
        console.log("Conntected to SQLite Database");
    }
});


module.exports = db;
