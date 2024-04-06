const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(query) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    console.log({ query });
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return "✅";
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// Function to insert data into MongoDB
async function insertData(data) {
  try {
    // Connect to MongoDB
    await client.connect();

    const dbName = process.env.DB;
    const collectionName = process.env.COLLECTION;
    // Select the database
    const db = client.db(dbName);

    // Insert the data into the collection
    const result = await db.collection(collectionName).insertMany(data);

    console.log(`${result.insertedCount} documents inserted`);

    return "✅";
  } catch (error) {
    console.error("Error inserting data:", error);
    return "❌";
  } finally {
    // Close the connection
    await client.close();
  }
}
exports.run = run;
exports.insertData = insertData;
