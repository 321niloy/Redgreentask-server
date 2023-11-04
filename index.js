const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
const port =process.env.PORT ||  5000

//----------------- reDgreentask
//----------------- 94x3OPgGgXkXFvAe


app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var uri = `mongodb://${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}@ac-mvazqsy-shard-00-00.hpy6sqt.mongodb.net:27017,ac-mvazqsy-shard-00-01.hpy6sqt.mongodb.net:27017,ac-mvazqsy-shard-00-02.hpy6sqt.mongodb.net:27017/?ssl=true&replicaSet=atlas-vll8ae-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection


 
  const adddatacollection = client.db("redgreentask").collection("alldata");

// ----------------Add data
    app.post('/adddata', async(req,res)=>{
      const newItem = req.body;
      console.log(newItem)
       const result = await adddatacollection.insertOne(newItem)
       res.send(result);
  });
//  get all data
  app.get('/alldata', async (req, res) => {
    const result = await adddatacollection.find().toArray();
    res.send(result);
  });

  // get single data
  app.get('/alldata/:id', async(req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await adddatacollection.findOne(query);
    res.send(result);
});

//  delete single data
  app.delete('/singledata/:id',async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = { _id: new ObjectId(id) }
    const result = await adddatacollection.deleteOne(query);
    res.send(result);
  })

// ---------Updata data
  app.put('/updatedata/:id', async(req,res) =>{
    const id = req.params.id;
    const updatedata = req.body
    console.log("Updatetestimonial",updatedata )
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const update = {
        $set: {
          name:updatedata.name,
          age:updatedata.age,
          loction:updatedata.location,
          number:updatedata.number,
          nid:updatedata.nid
        },
      };
      const result = await adddatacollection.updateOne(filter, update, options);
      res.send(result)
 })









    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})