const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
//user:Bikedb
//password:Okvn25zytnKA6AUh

const uri =
  'mongodb+srv://Bikedb:Okvn25zytnKA6AUh@cluster0.efb8elf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

async function run () {
  try {
    await client.connect()
    const Bikecollection = client.db('BikeService').collection('inventories')
    const JacketCollection = client.db('BikeService').collection('jacket')
    const BootsCollection = client.db('BikeService').collection('boots')
    const GlovesCollection = client.db('BikeService').collection('gloves')
    const HelmetCollection = client.db('BikeService').collection('helmet')

    app.get('/inventory', async (req, res) => {
      const query = {}
      const cursor = Bikecollection.find(query).limit(3)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/inventories', async (req, res) => {
      const query = {}
      const cursor = Bikecollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post('/inventories', async (req, res) => {
      const newUser = req.body
      const result = await Bikecollection.insertOne(newUser)
      res.send(result)
    })

    app.get('/jacket', async (req, res) => {
      const query = {}
      const cursor = JacketCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/boots', async (req, res) => {
      const query = {}
      const cursor = BootsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/helmet', async (req, res) => {
      const query = {}
      const cursor = HelmetCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.get('/gloves', async (req, res) => {
      const query = {}
      const cursor = GlovesCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/inventories/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const cursor = await Bikecollection.findOne(query)
      res.send(cursor)
    })
    app.delete('/inventories/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await Bikecollection.deleteOne(query)
      res.send(result)
    })
    app.put('/inventory/:id', async (req, res) => {
      const id = req.params.id
      const data = req.body
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          ...data
        }
      }
      const result = await Bikecollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const cursor = await Bikecollection.findOne(query)
      res.send(cursor)
    })
  } finally {
  }
}
run().catch(console.dir)
// client.connect(err => {

//   // perform actions on the collection object
//   client.close()
// })

app.get('/', (req, res) => {
  res.send('Bike server is now connected')
})
app.listen(port, () => {
  console.log('bike server running port is ', port)
})
