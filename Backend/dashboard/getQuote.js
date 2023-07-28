const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('Bloggers-Play');
        const collection = await db.collection('quotes').aggregate([
            { $sample: { size: 1 } }, // Randomly select 1 document
        ]).toArray();
        if(collection){
            res.json({ success: true, quote : collection });
        }
        else{
            res.json({ success: false });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
