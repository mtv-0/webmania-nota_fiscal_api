const { validationResult } = require("express-validator");
const NfeService = require("../services/nfeService");
const nfeService = new NfeService();
const logger = require("../utils/logger");
const { connectToCluster } = require("../config/mongoDb");
const NfeDatabaseController = require("../db_services/nfe");

class NfeController {
  /**
   * @swagger
   * tags:
   *   name: Notas Fiscais
   *   description: API para gerenciamento de Notas Fiscais
   */

  /**
   * @swagger
   * /nfe/emissao:
   *   post:
   *     summary: Emite uma nova nota fiscal
   *     tags: [Notas Fiscais]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               ID:
   *                 type: string
   *               url_notificacao:
   *                 type: string
   *               operacao:
   *                 type: integer
   *               natureza_operacao:
   *                 type: string
   *               modelo:
   *                 type: integer
   *               finalidade:
   *                 type: integer
   *               ambiente:
   *                 type: integer
   *               cliente:
   *                 type: object
   *                 properties:
   *                   cpf:
   *                     type: string
   *                   nome_completo:
   *                     type: string
   *                   endereco:
   *                     type: string
   *                   complemento:
   *                     type: string
   *                   numero:
   *                     type: integer
   *                   bairro:
   *                     type: string
   *                   cidade:
   *                     type: string
   *                   uf:
   *                     type: string
   *                   cep:
   *                     type: string
   *                   telefone:
   *                     type: string
   *                   email:
   *                     type: string
   *               produtos:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     nome:
   *                       type: string
   *                     codigo:
   *                       type: string
   *                     ncm:
   *                       type: string
   *                     cest:
   *                       type: string
   *                     quantidade:
   *                       type: integer
   *                     unidade:
   *                       type: string
   *                     peso:
   *                       type: string
   *                     origem:
   *                       type: integer
   *                     subtotal:
   *                       type: string
   *                     total:
   *                       type: string
   *                     classe_imposto:
   *                       type: string
   *               pedido:
   *                 type: object
   *                 properties:
   *                   pagamento:
   *                     type: integer
   *                   presenca:
   *                     type: integer
   *                   modalidade_frete:
   *                     type: integer
   *                   frete:
   *                     type: string
   *                   desconto:
   *                     type: string
   *                   total:
   *                     type: string
   *     responses:
   *       200:
   *         description: Nota fiscal emitida com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 uuid:
   *                   type: string
   *                   example: "2b471595-ee30-469d-81c2-087978003dac"
   *                 status:
   *                   type: string
   *                   example: "reprovado"
   *                 motivo:
   *                   type: string
   *                   example: "Rejeicao: CNPJ Emitente nao cadastrado"
   *                 nfe:
   *                   type: string
   *                   example: "1"
   *                 serie:
   *                   type: string
   *                   example: "2"
   *                 chave:
   *                   type: string
   *                   example: "43240830902296000105550020000000011100059922"
   *                 modelo:
   *                   type: string
   *                   example: "nfe"
   *                 epec:
   *                   type: boolean
   *                   example: false
   *                 xml:
   *                   type: string
   *                   example: "https://nfeautomatica.com.br/xmlnfe/43240830902296000105550020000000011100059922/"
   *                 danfe:
   *                   type: string
   *                   example: "https://nfeautomatica.com.br/danfe/43240830902296000105550020000000011100059922/"
   *                 danfe_simples:
   *                   type: string
   *                   example: "https://nfeautomatica.com.br/danfe/simples/43240830902296000105550020000000011100059922/"
   *                 danfe_etiqueta:
   *                   type: string
   *                   example: "https://nfeautomatica.com.br/danfe/etiqueta/43240830902296000105550020000000011100059922/"
   *                 log:
   *                   type: object
   *                   properties:
   *                     bStat:
   *                       type: boolean
   *                       example: true
   *                     versao:
   *                       type: string
   *                       example: "4.00"
   *                     tpAmb:
   *                       type: string
   *                       example: "1"
   *                     verAplic:
   *                       type: string
   *                       example: "RS2405142121DR"
   *                     cStat:
   *                       type: string
   *                       example: "104"
   *                     xMotivo:
   *                       type: string
   *                       example: "Lote processado"
   *                     cUF:
   *                       type: string
   *                       example: "43"
   *                     dhRecbto:
   *                       type: string
   *                       example: "2024-08-05T13:27:30-03:00"
   *                     tMed:
   *                       type: string
   *                       example: ""
   *                     nRec:
   *                       type: string
   *                       example: ""
   *                     aProt:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           chNFe:
   *                             type: string
   *                             example: "43240830902296000105550020000000011100059922"
   *                           dhRecbto:
   *                             type: string
   *                             example: "2024-08-05T13:27:30-03:00"
   *                           nProt:
   *                             type: string
   *                             example: ""
   *                           digVal:
   *                             type: string
   *                             example: "qUeNNit1AqMRW14WKEr6koSwDl0="
   *                           cStat:
   *                             type: string
   *                             example: "245"
   *                           xMotivo:
   *                             type: string
   *                             example: "Rejeicao: CNPJ Emitente nao cadastrado"
   *                 url_notificacao:
   *                   type: string
   *                   example: "http://localhost:3000/callbackNfe"
   *       500:
   *         description: Erro ao emitir nota fiscal
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */

  async emitirNotaFiscal(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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

  /**
   * @swagger
   * /nfe/consulta/{chave}:
   *   get:
   *     summary: Consulta uma nota fiscal pelo chave
   *     tags: [Notas Fiscais]
   *     parameters:
   *       - in: path
   *         name: chave
   *         schema:
   *           type: string
   *         required: true
   *         description: Chave da nota fiscal
   *     responses:
   *       200:
   *         description: Nota fiscal encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       500:
   *         description: Erro ao consultar nota fiscal
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async consultarNotaFiscal(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { chave } = req.params;
      const resultado = await nfeService.consultarNotaFiscal(chave);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao consultar nota fiscal", detail: error.message });
    }
  }
  /**
   * @swagger
   * /nfe/cancelar/{chave}:
   *   put:
   *     summary: Cancela uma nota fiscal pelo chave
   *     tags: [Notas Fiscais]
   *     parameters:
   *       - in: path
   *         name: chave
   *         schema:
   *           type: string
   *         required: true
   *         description: Chave da nota fiscal
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               motivo:
   *                 type: string
   *     responses:
   *       200:
   *         description: Nota fiscal cancelada com sucesso
   *         content:
   *           application/json:
   *              schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "cancelado"
   *                 xml:
   *                   type: string
   *                   example: "http://nfe.seudominio.com.br/xmlnfe/[chave|uuid]/?cancelado=1"
   *                 log:
   *                   type: object
   *                   properties:
   *                     bStat:
   *                       type: boolean
   *                       example: true
   *                     versao:
   *                       type: string
   *                       example: "4.00"
   *                     tpAmb:
   *                       type: string
   *                       example: "1"
   *                     verAplic:
   *                       type: string
   *                       example: "RS2405142121DR"
   *                     cStat:
   *                       type: string
   *                       example: "104"
   *                     xMotivo:
   *                       type: string
   *                       example: "Lote processado"
   *                     cUF:
   *                       type: string
   *                       example: "43"
   *                     dhRecbto:
   *                       type: string
   *                       example: "2024-08-05T13:27:30-03:00"
   *                     tMed:
   *                       type: string
   *                       example: ""
   *                     nRec:
   *                       type: string
   *                       example: ""
   *                     aProt:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           chNFe:
   *                             type: string
   *                             example: "43240830902296000105550020000000011100059922"
   *                           dhRecbto:
   *                             type: string
   *                             example: "2024-08-05T13:27:30-03:00"
   *                           nProt:
   *                             type: string
   *                             example: ""
   *                           digVal:
   *                             type: string
   *                             example: "qUeNNit1AqMRW14WKEr6koSwDl0="
   *                           cStat:
   *                             type: string
   *                             example: "245"
   *                           xMotivo:
   *                             type: string
   *                             example: "Rejeicao: CNPJ Emitente nao cadastrado"
   *       500:
   *         description: Erro ao cancelar nota fiscal
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  async cancelarNotaFiscal(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { chave } = req.params;
      const { motivo } = req.body;
      const resultado = await nfeService.cancelarNotaFiscal(chave, motivo);
      res.json(resultado);
    } catch (error) {
      next({ message: "Erro ao cancelar nota fiscal", detail: error.message });
    }
  }

  /**
   * @swagger
   * /nfe/certificado:
   *   get:
   *     summary: Verifica a validade do certificado digital
   *     tags: [Notas Fiscais]
   *     responses:
   *       200:
   *         description: Validade do certificado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 expiration:
   *                   type: number
   *                   example: 185
   *       500:
   *         description: Erro ao verificar validade do certificado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
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

  /**
   * @swagger
   * /nfe/status:
   *   get:
   *     summary: Verifica o status da Sefaz
   *     tags: [Notas Fiscais]
   *     responses:
   *       200:
   *         description: Status da Sefaz
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "online"
   *       500:
   *         description: Erro ao verificar status da Sefaz
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
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
