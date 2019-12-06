"use strict";
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER
    },
    {}
  );
  post.associate = function(models) {
    post.belongsTo(models.user);
    post.hasMany(models.comment, { as: "postComments" });
  };
  return post;
};
