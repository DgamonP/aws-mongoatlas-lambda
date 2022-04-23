
const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
const mongo = require('mongodb');
const { MongoClient, ServerApiVersion } = mongo;
//let db = null;

let connectToDatabase = (uri, dbName) => {
  // if (db && db.serverConfig.isConnected()) {
  //   return Promise.resolve(db);
  // }
  return MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    const db = client.db(dbName);
    return db;
  });
};
let getTodos = (db, table, query) => {
  return db
    .collection(table)
    // .findOne(query);
    .find({}).toArray();
}
exports.getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    // console.info('received:', event);

    // const mongoUri = process.env.MONGODB_URI 
    // const mongoDBName = process.env.MONGODB_NAME
    const mongoUri = 'mongodb+srv://dbDevelop:adminalfa@cluster-develop.w45zq.mongodb.net/deltaDev'
    const mongoDBName = 'deltaDev'
    console.log("conections",mongoUri,mongoDBName)
    const dbConnection = await connectToDatabase(mongoUri, mongoDBName);
    const todo = await getTodos(dbConnection, "users", {  });
    console.log(todo)
    return {
        statusCode: 200,
        body: JSON.stringify(todo),
    };

}
