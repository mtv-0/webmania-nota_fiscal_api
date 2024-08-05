require("dotenv").config();

module.exports = {
  baseURL: "https://webmaniabr.com/api/1/nfe/",
  credentials: {
    consumer_key: process.env.Consumer_Key,
    consumer_secret: process.env.Consumer_Secret,
    access_token: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret,
    classe_imposto: process.env.Class_imposto,
    url_callback: process.env.Url_callback,
  },
};
