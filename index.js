const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// dbuser1
// ehXBuFz2U3VxSt0n


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { use } = require('express/lib/router');
const uri = "mongodb+srv://dbuser1:ehXBuFz2U3VxSt0n@cluster0.0foiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // POST
        app.post('/user', async(req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        // GET by id
        app.get('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        // GET
        app.get('/users', async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // DELETE
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        // PUT
        app.put('/user/:Id', async(req, res) => {
            const id = req.params.Id;
            const updateUser = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result);
        });
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('My server is running');
});

app.listen(port, () => {
    console.log('My server is running on port ', port);
})