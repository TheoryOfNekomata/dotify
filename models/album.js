'use strict';
module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    name: DataTypes.STRING,
    year: DataTypes.STRING
  }, {});
  album.associate = function(models) {
    album.belongsTo(models.artist)
    album.hasMany(models.track)
  };
  return album;
};
