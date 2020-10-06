const express = require("express");
const router = express.Router();

const Url = require("../models/urlModel");
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(`${url.longUrl}`);
    } else {
      return res.status(400).json({
        message: "page not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "server error",
    });
  }
});
module.exports = router;
