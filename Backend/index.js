const express = require('express');
const cors = require('cors');
const app = express();

const login = require('./login');
const homePage = require('./homePage');
const createBlog = require('./createBlog');
const myBlogs = require('./myBlogs');
const updateBlog = require('./updateBlog');
const deleteBlog = require('./deleteblog')
const share = require('./share');
const like = require('./like');
const signup = require('./signup');

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
app.listen(port , () => console.log(`listening on port ${port}`));