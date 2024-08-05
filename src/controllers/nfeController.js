const NfeService = require("../services/nfeService");
const nfeService = new NfeService();
const logger = require("../utils/logger");
const NfeDatabaseController = require("../db_services/nfe");

class NfeController {
  async emitirNotaFiscal(req, res, next) {
    try {
      const dados = req.body;
      const resultado = await nfeService.emitirNotaFiscal(dados);

      const nfeDbService = new NfeDatabaseController();
      nfeDbService.storeNfe(resultado);

      logger.info("Emissão de nota fiscal realizada com sucesso", {
        dados,
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
      const resultado = await nfeService.consultarNotaFiscal(chave);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao consultar nota fiscal", detail: error.message });
    }
  }

  async cancelarNotaFiscal(req, res, next) {
    try {
      const { chave } = req.params;
      const { motivo } = req.body;
      const resultado = await nfeService.cancelarNotaFiscal(chave, motivo);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao cancelar nota fiscal", detail: error.message });
    }
  }

  async validadeCertificado(req, res, next) {
    try {
      const resultado = await nfeService.validadeCertificado();
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
      const resultado = await nfeService.statusSefaz();
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
