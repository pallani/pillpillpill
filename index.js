// Express
const express = require('express')
const app = express()
const router = express.Router()

// Express Middleware
app.use(require('cors')())
app.use(require('body-parser').raw({type: '*/*'}))

const moment = require('moment')

let pills = process.env.NO_OF_PILLS
let tolerance = process.env.TOLERANCE
let current = null

let lastReading = moment()

router.get('/report', async (request, response) => {
  let value = request.query.value
  lastReading = moment()
  console.log(value)
  if (current === null) {
    current = value
  } else if (value < current - tolerance) {
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
  pills = process.env.NO_OF_PILLS
  current = null
  response.status(200).json({ message: 'ok' })
})

app.use(router)

const serverPort = process.env.PORT || 10000

app.listen(serverPort, () => {
  console.log(`Server listening at ${serverPort}`)
})