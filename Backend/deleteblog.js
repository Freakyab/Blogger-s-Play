const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    await client.connect();
    const db = client.db('internship');
    const collection = db.collection('blog');
    const Blog = await collection.findOneAndDelete({ _id: new ObjectId(id) });
    if (Blog.value) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

module.exports = router;
