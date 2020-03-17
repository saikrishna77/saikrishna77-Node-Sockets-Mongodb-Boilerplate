const HTTPCodes = require('http-status-codes');
const logger = require('../Config/Logger');

const awaitHandler = fn => {
  return async (req, res, next) => {
    try {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      await fn(req, res, next);
    } catch (err) {
      logger.error(err.stack || err.message || err);
      next(err);
    }
  };
};

exports.fileUpload = awaitHandler(async (req, res) => {
  if (!req.file) {
    res.status(HTTPCodes.BAD_REQUEST).send({ success: false, message: 'file not in form data' });
  } else {
    console.log(req.fileMeta.ObjectID);
    res.send({
      success: true
    });
  }
});
