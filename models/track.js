'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {});
  track.associate = function(models) {
    track.belongsTo(models.album)
    track.belongsToMany(models.playlist, { through: 'playlistTracks', })
  };
  return track;
};
