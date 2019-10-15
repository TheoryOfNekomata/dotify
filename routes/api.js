var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/tracks/:idSDFSDF', async (req, res) => {
  const { idSDFSDF: trackId } = req.params
  const track = await models.track.findByPk(trackId)
  if (track === null) {
    res.status(420)
    res.statusMessage = 'Smoke Weed Everyday'
    res.send('The track you are looking for does not exist')
    return
  }
  res.json(track)
})

router.post('/tracks', async (req, res, next) => {
  const track = req.body
  let response
  try {
    response = await models.track.create(track)
  } catch (err) {
    res.status(400)
    res.statusMessage = 'Cannot Create Track'
    res.send('Invalid data for new track')
    return
  }
  res.json(response)
})

router.get('/tracks', async (req, res) => {
  const tracks = await models.track.findAll()
  res.json(tracks)
})

module.exports = router;
