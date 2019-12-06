const db = require("../../src/db/models");
const { user, post, comment } = db;
module.exports = {
  // ================ getPostComment =========================================
  getPostComment: (req, res) => {
    post
      .findAll({
        include: [{ model: user }, { model: post }]
      })
      .then(result => {
        res.status(200).send({
          message: `all posts with comments`,
          result
        });
      })
      .catch(error => {
        res.status(409).send({
          message: `failed to get all posts with comments`,
          error: error.message
        });
      });
  },

  // ================ addComment =========================================
  addComment: (req, res) => {
    comment
      .create(req.body)
      .then(result => {
        res.status(200).send({
          message: `comment created`,
          result
        });
      })
      .catch(error => {
        res.status(500).send({
          message: `failed to comment`,
          error: error.message
        });
      });
  }
};
