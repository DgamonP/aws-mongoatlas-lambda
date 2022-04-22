
const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
const mongo = require('mongodb');
const { MongoClient } = mongo;
let db = null;

let connectToDatabase = (uri, dbName) => {
  if (db && db.serverConfig.isConnected()) {
    return Promise.resolve(db);
  }
  return MongoClient.connect(uri, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    db = client.db(dbName);
    return db;
  });
};

let getTodoById = (db, table, query) => {
  return db
    .collection(table)
    .findOne(query);
}

exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    const mongoUri = process.env.MONGODB_URI 
    const mongoDBName = process.env.MONGODB_NAME

    const dbConnection = await connectToDatabase(mongoUri, mongoDBName);
    const todo = await getTodoById(dbConnection, "todos", { id: 100 });

    return {
        statusCode: 200,
        body: JSON.stringify(todo),
    };

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
