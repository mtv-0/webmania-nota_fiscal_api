const axios = require("axios");
const { baseURL, credentials } = require("../config/apiConfig");

class NfeService {
  constructor() {
    this.api = axios.create({
      baseURL,
      auth: {
        username: credentials.consumer_key,
        password: credentials.consumer_secret,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async emitirNotaFiscal(dados) {
    try {
      const response = await this.api.post("", dados);
      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao emitir nota fiscal: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  }

  async consultarNotaFiscal(chave) {
    try {
      const response = await this.api.get(`consulta/${chave}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao consultar nota fiscal: ${error.message}`);
    }
  }

  async cancelarNotaFiscal(chave, motivo) {
    try {
      const response = await this.api.put(`cancelar/${chave}`, { motivo });
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao cancelar nota fiscal: ${error.message}`);
    }
  }

  async validadeCertificado() {
    try {
      const response = await this.api.get("certificado");
      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao verificar validade do certificado: ${error.message}`
      );
    }
  }

  async statusSefaz() {
    try {
      const response = await this.api.get("status");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao verificar status da Sefaz: ${error.message}`);
    }
  }
}

module.exports = NfeService;
