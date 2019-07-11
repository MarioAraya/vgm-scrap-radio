const assert = require("assert");
// const mongoUri = "mongodb://arayaromero:arayaromero1@ds057862.mlab.com:57862/mlab-vgm-db"
const mongoUri = "mongodb://localhost";
const mongoose = require('mongoose');
let _db;

module.exports = {
    getDb,
    initDb
};

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

    mongoose.connect(mongoUri, { useNewUrlParser: true, dbName: 'mlab-vgm-db' }, connected)
    function connected(err, db) {
        if (err) {
            return callback(err);
        }
        _db = db;
        return callback(null, _db);
    }
}