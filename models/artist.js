'use strict';
module.exports = (sequelize, DataTypes) => {
  const artist = sequelize.define('artist', {
    name: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    timestamps: false,
  });
  artist.associate = function(models) {
    artist.hasMany(models.album)
  };
  return artist;
};
