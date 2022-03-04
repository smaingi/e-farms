// Import express
const express = require('express')

// Import user-controller
const mqttRoutes = require('../controllers/mqttController.js')

// Create router
const router = express.Router()

// router.get('/:id/mqtt', mqttRoutes.usersGet)

router.get('/all', mqttRoutes.mqttGetAll)


// Export router
module.exports = router
