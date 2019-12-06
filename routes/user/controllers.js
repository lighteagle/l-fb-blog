require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../src/db/models");
const { user } = db;

module.exports = {
  //=========================================== register =================================================
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(409).send({
        message: `body can't be empty`,
        error: error.message
      });
    }

    const existedUser = await user.findOne({ where: { email } });

    if (existedUser) {
      return res.status(409).send({
        message: `user: ${existedUser.name} already existed, please login`
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (!err) {
            user
              .create({ name, email, password: hash })
              .then(result => {
                return res.status(201).send({
                  message: `user created`,
                  result
                });
              })
              .catch(error => {
                return res.status(400).send({
                  message: `user not created`,
                  error: error.message
                });
              });
          } else {
            return res.status(409).send({
              message: `hashing password failed`,
              error: error.message
            });
          }
        });
      });
    }
  },

  //=========================================== login =================================================
  login: async (req, res) => {
    const { email, password } = req.body;
    const existedUser = await user.findOne({ where: { email } });

    if (existedUser) {
      const valid = bcrypt.compareSync(password, existedUser.password);

      if (valid) {
        jwt.sign(
          {
            user: {
              id: existedUser.id,
              name: existedUser.name,
              email: existedUser.email
            }
          },
          process.env.JWT_SECRET,
          { algorithm: "HS256" },
          function(err, token) {
            return res.status(200).send({
              message: "proceed to explore !",
              token
            });
          }
        );
      } else {
        return res.status(400).send("Password Invalid");
      }
    } else {
      return res
        .status(400)
        .send(`User with that email doesn't exist, please Register first`);
    }
  },

  //=========================================== getUserByID =================================================
  getUserByID: async (req, res) => {
    const id = req.params.id;

    const selectedUser = await user.findOne({ where: { id } });

    if (selectedUser) {
      return res.status(200).send({
        message: "user selected",
        selectedUser
      });
    } else {
      return res.status(400).send(`there is no user with id: ${id}`);
    }
  },

  //=========================================== getUserByID =================================================
  getAllUser: async (req, res) => {
    const users = await user.findAll();
    if (users) {
      return res.status(200).send({
        message: "All User",
        users
      });
    } else {
      return res.status(400).send(`there is no existed users`);
    }
  },

  //=========================================== deleteUser =================================================
  deleteUser: (req, res) => {},

  //=========================================== updateUser =================================================
  updateUser: (req, res) => {}
};
