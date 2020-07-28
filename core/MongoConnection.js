const { MongoClient } = require('mongodb');

let _db;
console.log(process.env.NODE_ENV);
const connectDB = new Promise((resolve, reject) => {
  try {
    let client = new MongoClient(
      process.env.NODE_ENV === 'developemet' ? 'mongodb://localhost:27017/' : process.env.DB_URI,
      { useUnifiedTopology: true }
    );
    client.connect((err, db) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      _db = db;
      console.log('connected successfully to mongodb');
      resolve(db.db(process.env.DB_Name || 'static-db-name'));
    });
  } catch (e) {
    console.log(e);
    reject(e);
  }
});

const disconnectDB = () => _db.close();

module.exports = { connectDB, disconnectDB };
