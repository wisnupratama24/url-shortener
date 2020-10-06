const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../models/urlModel");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  if (!validUrl.isUri(process.env.BASE_URL)) {
    return res.status(401).json({
      message: "not a valid url",
    });
  }

  // create url
  const urlCode = shortid.generate();
  // check valid long url
  if (validUrl.isUri(longUrl)) {
    let url = await Url.findOne({ longUrl });
    console.log(url);
    if (url !== null) {
      return res.json(url);
    } else {
      const shortUrl = `${process.env.BASE_URL}/${urlCode}`;
      url = new Url({
        urlCode,
        longUrl,
        shortUrl,
        date: new Date(),
      });

      await url.save();

      return res.json(url);
    }
  } else {
    return res.status(401).json({
      message: `${longUrl} not a valid url`,
    });
  }
});
module.exports = router;
