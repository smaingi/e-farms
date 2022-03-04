// Import express
const express = require('express')

const router = express.Router()

const test_users = [{
  firstName: "from API v2",
  lastName: "from API v2",
  email: "from API v2"
  }];

router.get("/", (req, res) => {
    // res.send("You're reaching the end point!");
    res.json(test_users);
})


// Export router
module.exports = router