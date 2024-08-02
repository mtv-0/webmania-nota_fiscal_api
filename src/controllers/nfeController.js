const NfeService = require("../services/nfeService");
const nfeService = new NfeService();

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
   *                 status:
   *                   type: string
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
  async emitirNotaFiscal(req, res) {
    try {
      const dados = req.body;
      const resultado = await nfeService.emitirNotaFiscal(dados);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  async consultarNotaFiscal(req, res) {
    try {
      const { chave } = req.params;
      const resultado = await nfeService.consultarNotaFiscal(chave);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
   *             schema:
   *               type: object
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
  async cancelarNotaFiscal(req, res) {
    try {
      const { chave } = req.params;
      const { motivo } = req.body;
      const resultado = await nfeService.cancelarNotaFiscal(chave, motivo);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  async validadeCertificado(req, res) {
    try {
      const resultado = await nfeService.validadeCertificado();
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  async statusSefaz(req, res) {
    try {
      const resultado = await nfeService.statusSefaz();
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = NfeController;
