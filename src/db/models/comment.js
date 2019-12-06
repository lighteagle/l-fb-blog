"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {}
  );
  comment.associate = function(models) {
    comment.belongsTo(models.post);
    comment.belongsTo(models.user);
  };
  return comment;
};
