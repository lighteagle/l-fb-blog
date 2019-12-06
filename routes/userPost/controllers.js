const db = require("../../src/db/models");
const { user, post } = db;
module.exports = {
  getUserPost: (req, res) => {
    user
      .findAll({
        attributes: ["id", "name", "email"],
        include: [
          {
            model: post,
            as: `userPosts`,
            attributes: ["id", "title", "content"]
          }
        ]
      })
      .then(result => {
        res.status(200).send({
          message: `all users with post`,
          result
        });
      })
      .catch(error => {
        res.status(409).send({
          message: `failed to get all users with post`,
          error: error.message
        });
      });
  },
  addPost: (req, res) => {
    post
      .create(req.body)
      .then(result => {
        res.status(200).send({
          message: `post created`,
          result
        });
      })
      .catch(error => {
        res.status(500).send({
          message: `failed to post`,
          error: error.message
        });
      });
  }
};
