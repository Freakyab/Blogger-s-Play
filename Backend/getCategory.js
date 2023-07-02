const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/', async (req, res) => {
    try {
        const { tags } = req.body;
        console.log(tags);
        await client.connect();
        const db = client.db('internship');
        const collection = db.collection('blog');
        const Blog = await collection.find({tags : tags}).toArray();
        console.log(Blog);
        if(Blog.length !== 0){
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
