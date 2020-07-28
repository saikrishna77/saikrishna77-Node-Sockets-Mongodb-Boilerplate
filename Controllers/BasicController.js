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
exports.basicRoute = awaitHandler(async (req, res) => {
  res.status(HTTPCodes.OK).send({ messsage: 'success' });
});
