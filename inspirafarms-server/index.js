'use strict'
// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
var busboy = require('connect-busboy');

// Import routes
const userRoute = require('./routes/userRoute')
const mqttRoute = require('./routes/mqttRoute')
const testRoute = require('./routes/testRoute')

const PORT = 4200
console.log("PORT IN SERVER: ", PORT)


// Create the express app
// const app = express(express.json());
const app = express();

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(busboy()); 

// Implement routes
app.use('/users', userRoute)
app.use('/mqtt', mqttRoute)
app.use('/test', testRoute)
// app.use('/api', meeHoow)




app.get("/", (req, res) => {
  res.json({message: "I like inspirafarms already"});
});

// Start server
app.listen(PORT, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log(`Started at http://localhost:${PORT}`)
})

