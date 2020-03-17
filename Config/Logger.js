const winston = require('winston');

const options = {
  info: {
    level: 'info',
    filename: `logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  error: {
    level: 'error',
    filename: `logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.info),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => {
    logger.info(message);
  }
};

module.exports = logger;
