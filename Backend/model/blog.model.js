const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const client = mongoose.createConnection('mongodb+srv://DynamicA:D0j3iO5c23I9Lmbo@cluster0.wxp0mkv.mongodb.net/Bloggers-Play?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    data : Object,
    author : String,
    authorId : String,
    likes : Number,
    category : String,
},{
    timestamps : true
});

const Blog = client.model('Blog',blogSchema);
module.exports = Blog;


