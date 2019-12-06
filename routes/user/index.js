var express = require("express");
var router = express.Router();
const {
  register,
  login,
  getUserByID,
  getAllUser,
  deleteUser,
  updateUser
} = require("./controllers");
const { authorization } = require("../../helpers/auth");

/* GET users listing. */
router.get("/", authorization, getAllUser);
router.get("/:id", authorization, getUserByID);

router.post("/register", register);
router.post("/authentication", login);

module.exports = router;
