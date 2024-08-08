const { connectToCluster } = require("../config/mongoDb");

class NfeRepository {
  constructor() {}

  async storeNfe(data) {
    const db = await connectToCluster();
    let collection = await db.collection("nfe");
    return await collection.insertOne(data);
  }
}

module.exports = NfeRepository;
