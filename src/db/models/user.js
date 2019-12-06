"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.post, { as: "userPosts" });
    user.hasMany(models.comment, { as: "userComments" });
  };
  return user;
};
