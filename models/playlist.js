'use strict';
module.exports = (sequelize, DataTypes) => {
  const playlist = sequelize.define('playlist', {
    name: DataTypes.STRING
  }, {});
  playlist.associate = function(models) {
    playlist.belongsTo(models.user, { foreignKey: 'creatorId', })
    playlist.hasMany(models.track)
  };
  return playlist;
};
