const axios = require("axios");
const NfeService = require("../src/services/nfeService");
jest.mock("axios");

describe("NfeController", () => {
  beforeEach(() => {
    NfeService.mockClear();
  });

  test("POST /nfe/emissao deve emitir uma nota fiscal", async () => {
    const mockData = { status: "sucesso" };
    NfeService.prototype.emitirNotaFiscal.mockResolvedValue(mockData);

    const response = await request(app)
      .post("/nfe/emissao")
      .send({
        ID: "17300",
        url_notificacao: "https://webmaniabr.com/retorno.php",
        operacao: 1,
        natureza_operacao: "Venda de produção do estabelecimento",
        modelo: 1,
        finalidade: 1,
        ambiente: 2,
        cliente: {
          cpf: "000.000.000-00",
          nome_completo: "Nome do Cliente",
          endereco: "Av. Brg. Faria Lima",
          complemento: "Escritório",
          numero: 1000,
          bairro: "Itaim Bibi",
          cidade: "São Paulo",
          uf: "SP",
          cep: "00000-000",
          telefone: "(00) 0000-0000",
          email: "nome@provedor.com",
        },
        produtos: [
          {
            nome: "Nome do produto",
            codigo: "nome-do-produto",
            ncm: "6109.10.00",
            cest: "28.038.00",
            quantidade: 3,
            unidade: "UN",
            peso: "0.800",
            origem: 0,
            subtotal: "44.90",
            total: "134.70",
            classe_imposto: "REF2892",
          },
        ],
        pedido: {
          pagamento: 0,
          presenca: 2,
          modalidade_frete: 0,
          frete: "12.56",
          desconto: "10.00",
          total: "174.60",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("consultarNotaFiscal deve consultar uma nota fiscal", async () => {
    const mockData = { id: 1, status: "sucesso" };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await nfeService.consultarNotaFiscal("chave123");

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("consulta/chave123");
  });

  test("cancelarNotaFiscal deve cancelar uma nota fiscal", async () => {
    const mockData = { id: 1, status: "sucesso" };
    axios.put.mockResolvedValue({ data: mockData });

    const result = await nfeService.cancelarNotaFiscal(
      "chave123",
      "motivo do cancelamento"
    );

    expect(result).toEqual(mockData);
    expect(axios.put).toHaveBeenCalledWith("cancelar/chave123", {
      motivo: "motivo do cancelamento",
    });
  });

  test("validadeCertificado deve retornar a validade do certificado", async () => {
    const mockData = { validade: "2024-12-31" };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await nfeService.validadeCertificado();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("certificado");
  });

  test("statusSefaz deve retornar o status da Sefaz", async () => {
    const mockData = { status: "operacional" };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await nfeService.statusSefaz();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("status");
  });
});
