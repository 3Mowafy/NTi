const MongoClient = require("mongodb").MongoClient;
const DBURL = process.env.DBURL;
const DBNAME = process.env.DBNAME;

const connect = (cb) => {
    MongoClient.connect(DBURL, (err, cl) => {
        if (err) return cb(err, null);
        const db = cl.db(DBNAME);
        cb(null, db);
    });
};

module.exports = connect;
