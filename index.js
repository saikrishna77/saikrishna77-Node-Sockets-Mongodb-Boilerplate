require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const MongoConnection = require('./core/MongoConnection.js');
const winston = require('./Config/Logger');

const FileUpload = require('./Routes/FileUpload');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(morgan('combined', { stream: winston.stream }));

const port = process.env.PORT || 4000;
let db;
const awaitHandler = fn => {
  return async (req, res, next) => {
    try {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      await fn(req, res, next);
    } catch (err) {
      winston.error(err.stack || err.message || err);
      next(err);
    }
  };
};

app.get(
  '/',
  awaitHandler(async (req, res) => {
    res.send({ res: 'dsfd' });
  })
);

const exportDb = async () => {
  module.exports = { db, app, port };
  app.use('/fileUpload', FileUpload);
  app.listen(port, () => {
    console.log(`Started up at port http://localhost:${port}/`);
  });
};

const connectDb = async () => {
  db = await MongoConnection.connectDB;
  exportDb();
};

connectDb();
