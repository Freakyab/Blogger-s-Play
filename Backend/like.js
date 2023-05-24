const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();

const client = new MongoClient('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

router.put('/', async (req, res) => {
    try {
        const { postId, userId } = req.body;
        await client.connect();
        const db = client.db('internship');
        const collection = db.collection('blog');
        const blog = await collection.findOne({ _id: new ObjectId(postId) });

        if (blog) {
            const likeIndex = blog.likes.indexOf(userId);
            if (likeIndex !== -1) {
                // If userId is already in the like array, remove it
                blog.likes.splice(likeIndex, 1);
            } else {
                // If userId is not in the like array, add it
                blog.likes.push(userId);
            }

            const updatedBlog = await collection.updateOne(
                { _id: new ObjectId(postId) },
                { $set: { likes: blog.likes } }
            );

            if (updatedBlog) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false, message: 'Blog post not found' });
        }
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: 'An error occurred' });
    }
});

module.exports = router;
