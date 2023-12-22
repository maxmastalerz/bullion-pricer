const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

async function connectToDatabase() {
  await client.connect();
}

module.exports = {
  connectToDatabase,
  client
};