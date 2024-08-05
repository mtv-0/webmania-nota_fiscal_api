const formatErrorResponse = require("../utils/errorHandler");

function errorHandler(err, req, res, next) {
  console.log(err);
  // Se o erro for um objeto com uma mensagem, use-o
  const message = err.message || "Internal Server Error";

  // Formate o erro
  const formattedError = formatErrorResponse(err.message, err.detail);

  // Registre o erro (opcional)
  console.error("Error caught by global handler:", formattedError);

  // Envia a resposta de erro
  res.status(err.status || 500).json(formattedError);
}

module.exports = errorHandler;
