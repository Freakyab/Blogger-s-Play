const Blog = require("../model/blog.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const { authorId } = req.query;
    if (!authorId) {
      return res.json({ success: false });
    }
    const blogs = await Blog.find({ authorId });
    if (blogs) {
      res.json({ success: true, blogs });
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

module.exports = router;
