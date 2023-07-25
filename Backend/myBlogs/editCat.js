const Blog = require("../model/blog.model");
const router = require("express").Router();
const ObjectId = require("mongodb").ObjectId;

router.put("/", async (req, res) => {
  try {
    const { id, category } = req.body;
    console.log(id, category); // or console.log(id.toHexString(), category);

    if (!id) {
      return res.json({ success: false });
    }

    // Convert the string id to an ObjectId using mongoose.Types.ObjectId

    const updateCategory = await Blog.findOneAndUpdate({ _id: id }, { category: category });
    console.log(updateCategory);
    if (updateCategory) {
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
