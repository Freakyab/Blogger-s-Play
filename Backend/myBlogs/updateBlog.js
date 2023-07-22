const Blog = require("../model/blog.model");
const router = require("express").Router();

router.put("/", async (req, res) => {
  try {
    const { id, data } = req.body;
    if (!id) {
      return res.json({ success: false });
    }
    const blogs = await Blog.findByIdAndUpdate(id, { $set: { data: data } }).lean();
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
