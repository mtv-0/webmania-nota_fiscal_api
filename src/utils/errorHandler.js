// src/utils/errorHandler.js
const logger = require("./logger");
function formatErrorResponse(message, error) {
  const errorObj = {
    message,
    details: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined, // Opcional: incluir stack trace apenas em desenvolvimento
  };
  logger.error(errorObj);
  return errorObj;
}

module.exports = formatErrorResponse;
