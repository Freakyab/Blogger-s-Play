const express = require('express');
const cors = require('cors');
const app = express();

const login = require('./login');
const homePage = require('./homePage');
const createBlog = require('./createBlog');
const myBlogs = require('./myBlogs/myBlogs');
const updateBlog = require('./myBlogs/updateBlog');
const deleteBlog = require('./myBlogs/deleteblog')
const share = require('./share');
const like = require('./like');
const signup = require('./signup');
const getCat = require("./getCategory");
// Testing 
// const blog = require('./model/blog.model');
const saveBlog = require('./Editor/save');
const port = 5000;


app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use("/homePage", homePage);
app.use("/createBlog", createBlog);
app.use("/myBlogs", myBlogs);
app.use("/updateBlog", updateBlog);
app.use("/deleteBlog", deleteBlog);
app.use("/like", like);
app.use("/share", share);
app.use("/signup", signup);
app.use("/getCategory",getCat);
// Testing 
app.use("/saveBlog", saveBlog);
app.listen(port , () => console.log(`listening on port ${port}`));