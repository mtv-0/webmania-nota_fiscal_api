# Sistema de Integração com API de Nota Fiscal da WebmaniaBR

Este projeto é uma aplicação Node.js que interage com a API de Nota Fiscal da WebmaniaBR, permitindo a emissão, consulta e cancelamento de notas fiscais. A aplicação utiliza mongoDB para armazenar as notas fiscais e `express-validator` para validações de entrada.

## Link do vídeo de apresentação da API

```
https://youtu.be/5Z7l-ML1TAs - Com áudio
https://youtu.be/NUy-vHT3J8E - Demonstração de funcionamento no pc principal (Sem áudio)
```

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento back-end baseada em JavaScript, escolhida por sua eficiência e grande suporte da comunidade.
- **Express.js**: Framework web para Node.js, utilizado para simplificar a criação de APIs RESTful.
- **MongoDB**: Ferramenta para armazenamento dos dados das notas fiscais.
- **Axios**: Biblioteca para fazer requisições HTTP, utilizada para interagir com a API da WebmaniaBR.
- **express-validator**: Middleware para validação de dados, garantindo a integridade dos dados recebidos pelos endpoints.
- **Winston**: Biblioteca para logging, utilizada para registrar informações importantes e erros no sistema.
- **Swagger**: Ferramenta para documentar APIs, facilitando a visualização e teste dos endpoints disponíveis.

## Estrutura do Projeto

```plaintext
src/
├── config/
│   ├── apiConfig.js         # Configuração dos envs
|   ├── mongoDb.js           # Configuração e inicialização do mongoDB
├── controllers/
│   ├── nfeController.js     # Controlador para os endpoints de Nota Fiscal
├── db_services/
│   ├── nfe.js        # Serviço para interagir com o banco de dados
├── services/
│   ├── nfeService.js        # Serviço para interagir com a API da WebmaniaBR
├── utils/
│   ├── logger.js            # Configuração do logger com Winston
│   ├── errorHandler.js      # Formatação de erro e armazenamento em log
├── validators/
│   ├── nfeValidator.js      # Validações para os endpoints de Nota Fiscal
├── index.js                 # Ponto de entrada da aplicação
├── swagger/
│   ├── swaggerConfig.js     # Configuração do Swagger para documentar a API
|   ├── nfeDoc.js            # Documentação referente às notas fiscais
test/
├── nfeService.test.js       # Testes unitários para o serviço de Nota Fiscal
```

## Instalação e Configuração

### Pré-requisitos

- Node.js (v12 ou superior)
- MongoDB (v6.0 ou superior)

### Passos para Configuração

1. Clone o repositório:

   ```sh
   git clone git@github.com:mtv-0/webmania-nota_fiscal_api.git
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as credenciais da API WebmaniaBR e do mongoDB em `src/config/apiConfig.js`:

   ```javascript
   module.exports = {
     baseURL: "https://webmaniabr.com/api/1/nfe/",
     credentials: {
       consumer_key: process.env.Consumer_Key,
       consumer_secret: process.env.Consumer_Secret,
       access_token: process.env.Access_Token,
       access_token_secret: process.env.Access_Token_Secret,
       classe_imposto: process.env.Class_imposto,
       url_callback: process.env.Url_callback,

       mongo_db_user: process.env.Mongo_db_user,
       mongo_db_password: process.env.Mongo_db_password,
     },
   };
   ```

4. Inicie o servidor:

   ```sh
   npm start
   ```

5. Para executar os testes, utilize o comando:

   ```sh
   npm test
   ```

## Acesse a documentação da API no Swagger:

```
http://localhost:3000/api-docs
```
