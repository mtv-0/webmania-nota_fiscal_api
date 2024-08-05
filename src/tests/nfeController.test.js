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
    it("Deve emitir uma nota fiscal");
    const mockData = {
      uuid: "2b471595-ee30-469d-81c2-087978003dac",
      status: "reprovado",
      motivo: "Rejeicao: CNPJ Emitente nao cadastrado",
      nfe: "1",
      serie: "2",
      chave: "43240830902296000105550020000000011100059922",
      modelo: "nfe",
      epec: false,
      xml: "https://nfeautomatica.com.br/xmlnfe/43240830902296000105550020000000011100059922/",
      danfe:
        "https://nfeautomatica.com.br/danfe/43240830902296000105550020000000011100059922/",
      danfe_simples:
        "https://nfeautomatica.com.br/danfe/simples/43240830902296000105550020000000011100059922/",
      danfe_etiqueta:
        "https://nfeautomatica.com.br/danfe/etiqueta/43240830902296000105550020000000011100059922/",
      log: {
        bStat: true,
        versao: "4.00",
        tpAmb: "1",
        verAplic: "RS2405142121DR",
        cStat: "104",
        xMotivo: "Lote processado",
        cUF: "43",
        dhRecbto: "2024-08-05T13:27:30-03:00",
        tMed: "",
        nRec: "",
        aProt: [
          {
            chNFe: "43240830902296000105550020000000011100059922",
            dhRecbto: "2024-08-05T13:27:30-03:00",
            nProt: "",
            digVal: "qUeNNit1AqMRW14WKEr6koSwDl0=",
            cStat: "245",
            xMotivo: "Rejeicao: CNPJ Emitente nao cadastrado",
          },
        ],
      },
      url_notificacao: "http://localhost:3000/callbackNfe",
    };
    NfeService.prototype.emitirNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app)
      .post("/nfe/emissao")
      .send({ data: "dados da nota" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/consulta/:chave ", async () => {
    it("Deve consultar uma nota fiscal");
    const mockData = {
      ID: "1137",
      uuid: "2b471595-ee30-469d-81c2-087978003dac",
      status: "reprovado",
      motivo: "Rejeicao: CNPJ Emitente nao cadastrado",
      nfe: 1,
      serie: 2,
      chave: "43240830902296000105550020000000011100059922",
      modelo: "nfe",
      epec: false,
      danfe_simples:
        "https://nfeautomatica.com.br/danfe/simples/43240830902296000105550020000000011100059922/",
      danfe_etiqueta:
        "https://nfeautomatica.com.br/danfe/etiqueta/43240830902296000105550020000000011100059922/",
      xml: "https://nfeautomatica.com.br/xmlnfe/43240830902296000105550020000000011100059922/",
      danfe:
        "https://nfeautomatica.com.br/danfe/43240830902296000105550020000000011100059922/",
      log: {
        bStat: true,
        versao: "4.00",
        tpAmb: "1",
        verAplic: "RS2405142121DR",
        cStat: "104",
        xMotivo: "Lote processado",
        cUF: "43",
        dhRecbto: "2024-08-05T13:27:30-03:00",
        tMed: "",
        nRec: "",
        aProt: [
          {
            chNFe: "43240830902296000105550020000000011100059922",
            dhRecbto: "2024-08-05T13:27:30-03:00",
            nProt: "",
            digVal: "qUeNNit1AqMRW14WKEr6koSwDl0=",
            cStat: "245",
            xMotivo: "Rejeicao: CNPJ Emitente nao cadastrado",
          },
        ],
      },
    };
    NfeService.prototype.consultarNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app).get(
      "/nfe/consulta/43240830902296000105550020000000011100059922"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("PUT /nfe/cancelar/:chave", async () => {
    it("Deve cancelar uma nota fiscal");
    const mockData = { status: "sucesso" };
    NfeService.prototype.cancelarNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app)
      .put("/nfe/cancelar/chave123")
      .send({ motivo: "motivo do cancelamento" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/certificado", async () => {
    it("Deve retornar a validade do certificado");
    const mockData = { expiration: 185 };
    NfeService.prototype.validadeCertificado.mockResolvedValue(mockData);

    const response = await request(app).get("/nfe/certificado");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("GET /nfe/status", async () => {
    it("Deve retornar o status da Sefaz");
    const mockData = { status: "online" };
    NfeService.prototype.statusSefaz.mockResolvedValue(mockData);

    const response = await request(app).get("/nfe/status");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });
});
