const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  info: (message, data) => {
    console.log(`${message} - ${JSON.stringify(data, null, 2)}`);
  },
  error: (message, data) => {
    console.error(`${message} - ${JSON.stringify(data, null, 2)}`);
  },
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "nfe-service" },
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
