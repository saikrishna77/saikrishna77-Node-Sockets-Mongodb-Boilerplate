const { MongoClient } = require('mongodb');

let _db;

const connectDB = new Promise((resolve, reject) => {
  try {
    MongoClient.connect(process.env.DB_URI, (err, db) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      _db = db;
      console.log('connected successfully to mongodb');
      resolve(db.db('apimachine'));
    });
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

const disconnectDB = () => _db.close();

module.exports = { connectDB, disconnectDB };
