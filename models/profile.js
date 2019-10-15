'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATEONLY
  }, {});
  profile.associate = function(models) {
    profile.belongsTo(models.user)
  };
  return profile;
};
