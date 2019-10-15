'use strict';

const artists = [
  {
    name: 'Parokya ni Edgar Allan Poe',
    verified: true,
  },
  {
    name: 'That Band',
    verified: false,
  },
  {
    name: 'You Belong to the Zoo',
    verified: true,
  },
  {
    name: 'Erasertails',
    verified: true,
  },
  {
    name: 'Left Dharma Right',
    verified: false,
  },
]

const tracks = [
  {
    name: 'No No Show',
    duration: 69420,
  },
  {
    name: 'DND na Nga',
    duration: 42069,
  },
  {
    name: 'Unang El Bimbo',
    duration: 1337,
  },
  {
    name: 'No No Show',
    duration: 69420,
  },
  {
    name: 'DND na Nga',
    duration: 42069,
  },
  {
    name: 'Unang El Bimbo',
    duration: 1337,
  },
  {
    name: 'No No Show',
    duration: 69420,
  },
  {
    name: 'DND na Nga',
    duration: 42069,
  },
  {
    name: 'Unang El Bimbo',
    duration: 1337,
  },
]

const albums = [
  {
    name: 'Photo',
    year: '2009',
  },
  {
    name: 'Kainan Sessions',
    year: '2003',
  },
  {
    name: 'Cut her Pillow',
    year: '2006',
  },
]

const playlists = [
  {
    name: 'Sentimeter',
  },
  {
    name: 'UV Express Playlist',
  },
  {
    name: 'Budots',
  },
  {
    name: 'Wish Ko Lang 106.9',
  },
]

const users = [
  {
    username: 'bobby_dy',
    password: '4chan!',
    firstName: 'Bobby',
    middleName: 'Shmurda',
    lastName: 'Dy',
    email: 'bobby_dy@example.com',
    birthday: '1992-08-08',
  },
  {
    username: 'john_doe',
    password: 'r3ddit?',
    firstName: 'John',
    middleName: 'Malacapacpac',
    lastName: 'Doe',
    email: 'malacapacpac@example.org',
    birthday: '1989-06-02',
  },
  {
    username: 'juandelacruz',
    password: 'f4c3.b00k',
    firstName: 'Juan',
    middleName: 'Santos',
    lastName: 'dela Cruz',
    email: 'ogpinoy@example.com.ph',
    birthday: '1991-03-07',
  },
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    const generateUsers = users => (
      Promise.all(
        users.map(({ username, password, ...profile }) => (
          queryInterface
            .bulkInsert('users', [{ username, password, }])
            .then(userId => (
              queryInterface
                .bulkInsert('profiles', [
                  {
                    ...profile,
                    userId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  }
                ])
            ))
        ))
      )
    )

    const generatePlaylists = playlists => availableTrackIds => (
      Promise
        .all(playlists.map(playlist => (
          queryInterface
            .bulkInsert('playlists', [
              {
                ...playlist,
                creatorId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            ])
            .then(playlistId => Promise
              .all(availableTrackIds.map(trackId => (
                queryInterface
                  .bulkInsert('playlistTracks', [
                    {
                      trackId,
                      playlistId,
                    }
                  ])
              ))))
        )))
    )

    const generateAlbumTracks = tracks => artistId => albumId => (
      Promise
        .all(tracks.map(track => (
          queryInterface
            .bulkInsert('tracks',[
              {
                ...track,
                albumId,
                artistId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            ])
        )))
        .then(generatePlaylists(playlists))
    )

    const generateArtistAlbums = albums => artistId => (
      Promise.all(
        albums.map(album => (
          queryInterface
            .bulkInsert('albums',[
              {
                ...album,
                artistId,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            ])
            .then(generateAlbumTracks(tracks)(artistId))
          )
        )
      )
    )

    const generateArtists = artists => (
      Promise.all(
        artists.map(artist => (
          queryInterface
            .bulkInsert('artists', [artist])
            .then(generateArtistAlbums(albums))
        ))
      )
    )

    return (
      generateUsers(users)
        .then(() => generateArtists(artists))
    )

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
