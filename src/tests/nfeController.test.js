const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const NfeController = require("../src/controllers/nfeController");
const NfeService = require("../src/services/nfeService");

jest.mock("../src/services/nfeService");

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

describe("NfeController", () => {
  beforeEach(() => {
    NfeService.mockClear();
  });

  test("POST /nfe/emissao ", async () => {
    it("deve emitir uma nota fiscal");
    const mockData = { status: "sucesso" };
    NfeService.prototype.emitirNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app)
      .post("/nfe/emissao")
      .send({ data: "dados da nota" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/consulta/:chave deve consultar uma nota fiscal", async () => {
    const mockData = { status: "sucesso" };
    NfeService.prototype.consultarNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app).get("/nfe/consulta/chave123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("PUT /nfe/cancelar/:chave deve cancelar uma nota fiscal", async () => {
    const mockData = { status: "sucesso" };
    NfeService.prototype.cancelarNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app)
      .put("/nfe/cancelar/chave123")
      .send({ motivo: "motivo do cancelamento" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/certificado deve retornar a validade do certificado", async () => {
    const mockData = { validade: "2024-12-31" };
    NfeService.prototype.validadeCertificado.mockResolvedValue(mockData);

    const response = await request(app).get("/nfe/certificado");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/status deve retornar o status da Sefaz", async () => {
    const mockData = { status: "operacional" };
    NfeService.prototype.statusSefaz.mockResolvedValue(mockData);

    const response = await request(app).get("/nfe/status");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });
});
