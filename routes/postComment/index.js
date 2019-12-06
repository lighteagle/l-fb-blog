var express = require("express");
var router = express.Router();

const { getPostComment, addComment } = require("./controllers");

router.get("/", getPostComment);

router.post("/", addComment);

module.exports = router;
