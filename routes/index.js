var express = require("express");
const con = require("../modules/mysql");
var router = express.Router();

const listsRouter = require("./lists/index");

router.get("/", (req, res) => {
  res.json({
    message: "접속 완료",
  });
});

router.use("/lists", listsRouter);

module.exports = router;
