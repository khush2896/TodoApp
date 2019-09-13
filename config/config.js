const winston = require('winston')
const logger = new winston.createLogger({
  // pending
  // IP - StatusCode - Route


  // format: combine(
  //   label({ label: 'right meow!' }),
  //   timestamp(),
  //   prettyPrint()
  // ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' })
  ]
});

module.exports = logger