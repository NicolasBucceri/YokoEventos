const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nicolas:yoko_eventos@cluster0.wu4uf2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
