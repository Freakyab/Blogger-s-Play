const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('internship');
        const collection = db.collection('blog');
        const Blog = await collection.find({by : req.query.id}).toArray();
        if(Blog){
            res.json({ success: true, Blog });
        }
        else{
            res.json({ success: false });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false });
    }
});

module.exports = router;
