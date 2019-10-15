var express = require('express')
var router = express.Router()
var models = require('../models')

router.use((req, res, next) => {
  res.sendWithType = (data) => {
    const accepts = req.accepts('application/json', 'application/xml')
    switch (accepts) {
      case 'application/json':
        res.json(data)
        return
      case 'application/xml':
        res.send('<data hello="world" />')
        return
      default:
        break
    }

    res.status(406)
    res.statusMessage = 'Deserializer Not Supported For MIME Type'
    res.send(`The MIME type "${req.get('accept')}" is not supported at this time.`)
  }
  next()
})

router.get('/', (req, res) => {
  res.sendWithType({
    hello: 'world',
  })
})

router.get('/tracks', async (req, res) => {
  const allTracks = await models.track.findAll()
  res.sendWithType(allTracks)
})

module.exports = router
