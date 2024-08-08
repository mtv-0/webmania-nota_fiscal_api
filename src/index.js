const NfeController = require("./controllers/nfeController");
const NfeService = require("./services/nfeService");
const NfeDatabaseController = require("./db_services/nfe");

const express = require("express");
const bodyParser = require("body-parser");
const { swaggerUi, swaggerDocs } = require("./swagger/swaggerConfig");
const {
  emitirNotaFiscalValidator,
  consultarNotaFiscalValidator,
  cancelarNotaFiscalValidator,
} = require("./validator/nfeValidator");
const errorHandler = require("./middleware/errorHandler");
const handleValidationErrors = require("./validator/validatorDefaultHandler");

const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nfeController = new NfeController(
  new NfeService(),
  new NfeDatabaseController()
);

app.post(
  "/nfe/emissao",
  emitirNotaFiscalValidator,
  handleValidationErrors,
  (req, res, next) => nfeController.emitirNotaFiscal(req, res, next)
);
app.get(
  "/nfe/consulta/:chave",
  consultarNotaFiscalValidator,
  handleValidationErrors,
  (req, res, next) => nfeController.consultarNotaFiscal(req, res, next)
);
app.put(
  "/nfe/cancelar/:chave",
  cancelarNotaFiscalValidator,
  handleValidationErrors,
  (req, res, next) => nfeController.cancelarNotaFiscal(req, res, next)
);
app.get("/nfe/certificado", (req, res, next) =>
  nfeController.validadeCertificado(req, res, next)
);
app.get("/nfe/status", (req, res, next) =>
  nfeController.statusSefaz(req, res, next)
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
