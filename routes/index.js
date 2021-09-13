var express = require("express");
var router = express.Router();

const listsRouter = require("./lists/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/lists", listsRouter);

module.exports = router;
