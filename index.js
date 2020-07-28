//-------------------------------------------------Environment Variables --------------------------------------------------------------------//
require('dotenv').config();
//-------------------------------------------------------------------------------------------------------------------------------------------//

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoConnection = require('./core/MongoConnection.js');
const FileUpload = require('./Routes/FileUpload');
const BasicRoute = require('./Routes/BasicRoutes');
const winston = require('./Config/Logger');

//-----------------------------------Comment the below require if you are not using Sockets--------------------------------------------------//
require('./core/SocketConnection');
//-------------------------------------------------------------------------------------------------------------------------------------------//

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(morgan('combined', { stream: winston.stream }));

let db;

//------------------------------------------------- setting up basic routes------------------------------------------------------------------//
const exportDb = async () => {
  module.exports = { app };
  module.exports = { db };

  //Routes
  app.use('/basic', BasicRoute);
  app.use('/fileUpload', FileUpload);
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Started running port at http://localhost:${process.env.PORT || 4000}/`);
  });
};
//----------------------------------------------------------------------------------------------------------------------------------------//

const Initiate = async () => {
  db = await MongoConnection.connectDB;
  exportDb();
};

//--------------------------------------------------Starting the server---------------------------------------------------------------------//
Initiate();
//-----------------------------------------------------------------------------------------------------------------------------------------//
