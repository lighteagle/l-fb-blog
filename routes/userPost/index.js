var express = require("express");
var router = express.Router();

const { getUserPost, addPost } = require("./controllers");

router.get("/", getUserPost);

router.post("/", addPost);

module.exports = router;
