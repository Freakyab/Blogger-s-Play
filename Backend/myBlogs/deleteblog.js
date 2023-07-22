const Blog = require("../model/blog.model");
const router = require("express").Router();

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ success: false });
    }
    console.log(id);
    const blogs = await Blog.findOneAndDelete({ _id: id }).lean();
    console.log(blogs);
    if (blogs) {
      res.json({ success: true});
    } else {
      res.json({ success: false });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false });
  }
});

module.exports = router;
