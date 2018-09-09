// Express
const express = require('express')
const app = express()
const router = express.Router()

// Express Middleware
app.use(require('cors')())
app.use(require('body-parser').raw({type: '*/*'}))

const moment = require('moment')

let pills = 3

let current = 0

let tolerance = 30

let lastReading = moment()

router.get('/report', async (request, response) => {
  let value = request.query.value
  lastReading = moment()
  console.log(value)
  if (value > current + tolerance) {
    console.log('value changed!')
    current = value
    pills = pills - 1
  }
  response.status(200).json({ message: 'ok' })
})

router.get('/usage', async (request, response) => {
  response.status(200).json({ pills_left: pills, last_reading: lastReading.fromNow()})
})

router.get('/reset', async (request, response) => {
  pills = 3
  current = 0
  response.status(200).json({ message: 'ok' })
})

app.use(router)

const serverPort = process.env.PORT || 10000

app.listen(serverPort, () => {
  console.log(`Server listening at ${serverPort}`)
})