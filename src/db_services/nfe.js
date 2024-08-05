const { connectToCluster } = require("../config/mongoDb");

class NfeDatabaseController {
  constructor() {}

  async storeNfe(data) {
    const db = await connectToCluster();
    let collection = await db.collection("nfe");
    return await collection.insertOne(data);
  }
}

module.exports = NfeDatabaseController;
