const winston = require('winston'); //(1)

function logProvider() {
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(winston.format.splat(), winston.format.simple()),
    transports: [new winston.transports.Console()],
  });
}

const PROXY_CONF = {
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    logProvider,
  }
};

module.exports = PROXY_CONF;