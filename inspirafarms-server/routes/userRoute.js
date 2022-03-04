// Import express
const express = require('express')

// Import user-controller
const userRoutes = require('./../controllers/userController.js')

// Create router
const router = express.Router()

router.get('/:id/user', userRoutes.usersGet)

router.get('/all', userRoutes.usersGetAll)

router.post('/create', userRoutes.usersCreate)

router.post('/update', userRoutes.usersUpdate)

router.post('/delete', userRoutes.usersDelete)

router.post('/drop-table', userRoutes.usersDropTable);

// Export router
module.exports = router
