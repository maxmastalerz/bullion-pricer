const { MongoClient } = require("mongodb");

let _db;
let connecting = false;

async function connectToDatabase() {
  if (!_db && !connecting) {
    connecting = true;
    
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
    } finally {
      connecting = false;
    }
  } else { // If another process is already connecting, wait for it to finish, we'll just end up getting their connection object.
    while (connecting) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return _db;
}

module.exports = { connectToDatabase };