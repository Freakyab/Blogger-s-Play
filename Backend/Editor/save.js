const Blog = require("../model/blog.model");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { data, author, authorId, likes, category } = req.body;
    if (!data || !author || !authorId || !category) {
      return res.json({ success: false });
    }

    const blog = await Blog.create({ data, author, authorId, likes, category });
    if (blog) {
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
