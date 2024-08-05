const axios = require("axios");
const { baseURL, credentials } = require("../config/apiConfig");

class NfeService {
  constructor() {
    this.api = axios.create({
      baseURL,
      auth: {},
      headers: {
        "Content-Type": "application/json",
        "Consumer-Key": credentials.consumer_key,
        "X-Consumer-Secret": credentials.consumer_secret,
        "X-Access-Token": credentials.access_token,
        "X-Access-Token-Secret": credentials.access_token_secret,
      },
    });
  }

  async emitirNotaFiscal(dados) {
    try {
      const response = await this.api.post("emissao/", dados);

      return {
        ...response.data,
        url_notificacao: credentials.url_callback,
      };
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  async consultarNotaFiscal(chave) {
    try {
      const response = await this.api.get(`consulta/`, { chave });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async cancelarNotaFiscal(chave, motivo) {
    try {
      const response = await this.api.put(`cancelar/`, { chave, motivo });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validadeCertificado() {
    try {
      const response = await this.api.get("certificado");
      return response.data;
    } catch (error) {
      throw new Error(error.message.data);
    }
  }

  async statusSefaz() {
    try {
      const response = await this.api.get("sefaz");
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async impostos() {
    try {
      const response = await this.api.get("classe-imposto");
      return response.data;
    } catch (e) {}
  }
}

module.exports = NfeService;
