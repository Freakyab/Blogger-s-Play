const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', async (req, res) => {
    try {
        const { username, password, name } = req.body;
        if (username === "" || password === "" || name === "") {
            res.json({ success: false });
        }

        await client.connect();
        const db = client.db('internship');
        const collection = db.collection('account data');
        const user = await collection.insertOne({ username, password, name });

        if (user) {
            res.json({ success: true, id: user.insertedId, name: name });
        } else {
            res.json({ success: false });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

module.exports = router;
