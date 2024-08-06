const NfeService = require("../services/nfeService");
const logger = require("../utils/logger");
const NfeDatabaseController = require("../db_services/nfe");

class NfeController {
  constructor() {
    this.nfeService = new NfeService();
    this.nfeDbService = new NfeDatabaseController();
  }
  async emitirNotaFiscal(req, res, next) {
    try {
      const dados = req.body;
      const resultado = await this.nfeService.emitirNotaFiscal(dados);

      this.nfeDbService.storeNfe(resultado);

      logger.info("Emissão de nota fiscal realizada com sucesso", {
        resultado,
      });
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao emitir nota fiscal", detail: error.message });
    }
  }

  async consultarNotaFiscal(req, res, next) {
    try {
      const { chave } = req.params;
      const resultado = await this.nfeService.consultarNotaFiscal(chave);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao consultar nota fiscal", detail: error.message });
    }
  }

  async cancelarNotaFiscal(req, res, next) {
    try {
      const { chave } = req.params;
      const { motivo } = req.body;
      const resultado = await this.nfeService.cancelarNotaFiscal(chave, motivo);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao cancelar nota fiscal", detail: error.message });
    }
  }

  async validadeCertificado(req, res, next) {
    try {
      const resultado = await this.nfeService.validadeCertificado();
      res.json(resultado);
    } catch (error) {
      next({
        message: "Erro ao verificar validade de certificado",
        detail: error.message,
      });
    }
  }

  async statusSefaz(req, res, next) {
    try {
      const resultado = await this.nfeService.statusSefaz();
      res.json(resultado);
    } catch (error) {
      next({
        message: "Erro ao verificar status sefaz",
        detail: error.message,
      });
    }
  }

  async callbackNfe(req, res, next) {
    try {
      const callback = req.body();
      console.log("Callback recebido: ", callback);
      res.json();
    } catch (error) {
      next({ message: error.message });
    }
  }
}

module.exports = NfeController;
