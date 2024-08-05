const express = require("express");
const bodyParser = require("body-parser");
const NfeController = require("./controllers/nfeController");
const { swaggerUi, swaggerDocs } = require("./swaggerConfig");
const { emitirNotaFiscalValidator } = require("./validator/nfeValidator");

const app = express();

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const nfeController = new NfeController();

app.post("/nfe/emissao", emitirNotaFiscalValidator, (req, res) =>
  nfeController.emitirNotaFiscal(req, res)
);
app.get("/nfe/consulta/:chave", (req, res) =>
  nfeController.consultarNotaFiscal(req, res)
);
app.put("/nfe/cancelar/:chave", (req, res) =>
  nfeController.cancelarNotaFiscal(req, res)
);
app.get("/nfe/certificado", (req, res) =>
  nfeController.validadeCertificado(req, res)
);
app.get("/nfe/status", (req, res) => nfeController.statusSefaz(req, res));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
