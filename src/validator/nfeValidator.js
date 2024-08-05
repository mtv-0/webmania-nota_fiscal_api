const { body, param } = require("express-validator");

const emitirNotaFiscalValidator = [
  body("ID")
    .isInt({ gt: 0 })
    .withMessage("ID é obrigatório e deve ser um número inteiro positivo"),
  //body("url_notificacao").isURL().withMessage("URL de notificação inválida"),
  body("operacao")
    .isInt({ min: 1, max: 5 })
    .withMessage("Operação deve ser um número entre 1 e 5"),
  body("natureza_operacao")
    .notEmpty()
    .withMessage("Natureza da operação é obrigatória"),
  body("modelo")
    .isInt({ min: 1, max: 3 })
    .withMessage("Modelo deve ser um número entre 1 e 3"),
  body("finalidade")
    .isInt({ min: 1, max: 4 })
    .withMessage("Finalidade deve ser um número entre 1 e 4"),
  body("ambiente")
    .isInt({ min: 1, max: 2 })
    .withMessage("Ambiente deve ser 1 (Produção) ou 2 (Homologação)"),
  body("cliente.cpf")
    .isLength({ min: 11, max: 14 })
    .withMessage("CPF inválido"),
  body("cliente.nome_completo")
    .notEmpty()
    .withMessage("Nome do cliente é obrigatório"),
  body("cliente.endereco").notEmpty().withMessage("Endereço é obrigatório"),
  body("cliente.complemento")
    .optional()
    .isString()
    .withMessage("Complemento deve ser uma string"),
  body("cliente.numero")
    .isInt({ gt: 0 })
    .withMessage("Número do endereço deve ser um número inteiro positivo"),
  body("cliente.bairro").notEmpty().withMessage("Bairro é obrigatório"),
  body("cliente.cidade").notEmpty().withMessage("Cidade é obrigatória"),
  body("cliente.uf")
    .isLength({ min: 2, max: 2 })
    .withMessage("UF deve ter 2 caracteres"),
  body("cliente.cep").isLength({ min: 8, max: 9 }).withMessage("CEP inválido"),
  body("cliente.telefone").notEmpty().withMessage("Telefone é obrigatório"),
  body("cliente.email").isEmail().withMessage("E-mail inválido"),
  body("produtos")
    .isArray({ min: 1 })
    .withMessage("Pelo menos um produto é necessário"),
  body("produtos.*.nome")
    .notEmpty()
    .withMessage("Nome do produto é obrigatório"),
  body("produtos.*.codigo")
    .notEmpty()
    .withMessage("Código do produto é obrigatório"),
  body("produtos.*.ncm")
    .isLength({ min: 8 })
    .withMessage("NCM deve ter 8 caracteres"),
  body("produtos.*.cest")
    .isLength({ min: 7 })
    .withMessage("CEST deve ter 7 caracteres"),
  body("produtos.*.quantidade")
    .isFloat({ gt: 0 })
    .withMessage("Quantidade do produto deve ser maior que zero"),
  body("produtos.*.unidade")
    .notEmpty()
    .withMessage("Unidade do produto é obrigatória"),
  body("produtos.*.peso")
    .isFloat({ gt: 0 })
    .withMessage("Peso do produto deve ser maior que zero"),
  body("produtos.*.origem")
    .isInt({ min: 0, max: 8 })
    .withMessage("Origem deve ser um número entre 0 e 8"),
  body("produtos.*.subtotal")
    .isFloat({ gt: 0 })
    .withMessage("Subtotal do produto deve ser maior que zero"),
  body("produtos.*.total")
    .isFloat({ gt: 0 })
    .withMessage("Total do produto deve ser maior que zero"),
  body("produtos.*.classe_imposto")
    .notEmpty()
    .withMessage("Classe de imposto é obrigatória"),
  body("pedido.pagamento")
    .isInt({ min: 0, max: 3 })
    .withMessage("Pagamento deve ser um número entre 0 e 3"),
  body("pedido.presenca")
    .isInt({ min: 0, max: 9 })
    .withMessage("Presença deve ser um número entre 0 e 9"),
  body("pedido.modalidade_frete")
    .isInt({ min: 0, max: 9 })
    .withMessage("Modalidade de frete deve ser um número entre 0 e 9"),
  body("pedido.frete")
    .isFloat({ gt: 0 })
    .withMessage("Frete deve ser maior que zero"),
  body("pedido.desconto")
    .isFloat({ gt: 0 })
    .withMessage("Desconto deve ser maior que zero"),
  body("pedido.total")
    .isFloat({ gt: 0 })
    .withMessage("Total deve ser maior que zero"),
];

const consultarNotaFiscalValidator = [
  param("chave")
    .isLength({ min: 20, max: 44 })
    .withMessage("Chave de nota fiscal inválida"),
];

const cancelarNotaFiscalValidator = [
  param("chave")
    .isLength({ min: 20, max: 44 })
    .withMessage("Chave de nota fiscal inválida"),
  body("motivo").notEmpty().withMessage("Motivo é obrigatório"),
];

module.exports = {
  emitirNotaFiscalValidator,
  consultarNotaFiscalValidator,
  cancelarNotaFiscalValidator,
};
