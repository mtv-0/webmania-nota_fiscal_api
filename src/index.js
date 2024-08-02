const express = require("express");
const bodyParser = require("body-parser");
const NfeController = require("./controllers/nfeController");
const { swaggerUi, swaggerDocs } = require("./swaggerConfig");

const app = express();
app.use(bodyParser.json());

const nfeController = new NfeController();

app.post("/nfe/emissao", (req, res) =>
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
