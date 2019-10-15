'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('playlists', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        creatorId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
      queryInterface.createTable('playlistTracks', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        playlistId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'playlists',
            key: 'id',
          },
        },
        trackId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tracks',
            key: 'id',
          },
        },
      })
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('playlistTracks')
      .then(() => queryInterface.dropTable('playlists'));
  }
};
