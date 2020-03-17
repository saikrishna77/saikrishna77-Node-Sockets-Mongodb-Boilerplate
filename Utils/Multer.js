const multer = require('multer');
const { ObjectID } = require('mongodb');

const buildStorage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./GeneralStorage/`);
    },
    filename: (req, file, cb) => {
      req.fileMeta = {};
      req.fileMeta.ObjectID = new ObjectID();
      req.fileMeta.ObjectID += Math.floor(Math.random() * 10000 + 1);
      const ext = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length
      );
      req.fileMeta.ext = ext;
      cb(null, `${req.fileMeta.ObjectID}${ext}`);
    }
  });

  return multer({ storage });
};

module.exports = buildStorage;
