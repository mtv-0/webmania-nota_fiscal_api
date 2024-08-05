const { MongoClient } = require("mongodb");
const { credentials } = require("../config/apiConfig");

async function connectToCluster() {
  let client;

  try {
    const connectionString = `mongodb+srv://${credentials.mongo_db_user}:${credentials.mongo_db_password}@webmania-db.wxadn8w.mongodb.net/webmania-db?retryWrites=true&w=majority`;

    console.log(connectionString);
    client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connecting to MongoDB Atlas cluster...");
    await client.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    const db = client.db("webmania-db");

    return db;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit(1);
  }
}

module.exports = { connectToCluster };
