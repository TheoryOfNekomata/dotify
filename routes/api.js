var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
  next({
    hello: 'world',
  })
  //next({
  //  hello: 'world',
  //})
})

//router.use((data, req, res, next) => {
//  const accepts = req.accepts('application/json', 'application/xml')
//
//  console.log('HEHE', data, accepts)
//
//  //switch (accepts) {
//  //  case 'application/json':
//  //    res.json(data)
//  //    return
//  //  case 'application/xml':
//  //    res.send('<data hello="world"></data>')
//  //    return
//  //  default:
//  //    break
//  //}
//
//  next()
//
//  //res.status(406)
//  //res.statusMessage = 'Deserializer Not Supported For MIME Type'
//  //res.send(`The MIME type "${accepts}" is not supported at this time.`)
//})

module.exports = router
