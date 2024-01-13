const { MongoClient } = require("mongodb");

let _db;

async function connectToDatabase() {
  if (!_db) {
    const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      _db = client.db();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  return _db;
}

module.exports = { connectToDatabase };