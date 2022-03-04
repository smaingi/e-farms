// USER CRUD.

// Import database
const knex = require('./../db');
const path = require('path');

exports.usersWeka = ( tableName, data) => {
  return knex(tableName)
  .insert(data)
  .then(resp => resp)
  .finally(()=> db.destroy());
}

// GET MULTIPLE
exports.usersGetAll = async (req, res) => {
  knex
    .select('*')
    .from('userData')
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}
// GET
exports.usersGet = async (req, res) => {
  knex
    .select('*')
    .from('userData')
    .where("id", req.params.id)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    })
}

// CREATE
exports.usersCreate = async (req, res) => {
  knex
    .select('*')
    .from('userData')
    .where("userName", req.body.userName)
    .then(userData => {
      if (userData.length > 0) {
        throw new Error("User already exists in database!")
      } else {
        knex('userData')
          .insert({
            'userName': req.body.userName,
            'companyName': req.body.companyName,
            'coldRoomName': req.body.coldRoomName,
          })
          .then(async () => {
            // Send a success message in response
            res.json({ message: `User \'${req.body.firstName} ${req.body.lastName}\' by created.` })
          })
          .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error creating user ${req.body.name}: ${err}` })
          })
      }
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving user: ${err}` })
    });
}

// UPDATE
exports.usersUpdate = async (req, res) => {
  knex('userData')
    .where('id', req.body.id)
    .update(req.body)
    .then(() => {
      res.json({ message: `User ${req.body.id} updated.` })
    })
    .catch(err => {
      res.json({ message: `There was an error updating ${req.body.id} user: ${err}` })
    })
}


// DELETE
exports.usersDelete = async (req, res) => {
  knex('userData')
    .where('id', req.body.id)
    .del()
    .then(() => {
      res.json({ message: `User ${req.body.id} deleted.` })
    })
    .catch(err => {
      res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
    })
}

exports.usersDropTable = async (req, res) => {
  knex.schema.dropTable('userData')
    .then(() => {
      console.log("Deleted user data table.")
      res.json({ message: 'User data table dropped!' })
    })
}
