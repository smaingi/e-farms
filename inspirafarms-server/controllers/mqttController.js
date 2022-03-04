// USER CRUD.

// Import database
// const knex = require('./../db');
// const path = require('path');

require('dotenv').config();

const Influx = require('influx');
const _ = require('lodash');
const os=require('os');

const client = new Influx.InfluxDB({
  database: 'inspirafarms',
  host: process.env.HOST,
  port: 8086,
  username: process.env.UNAME,
  password: process.env.PASSWORD,
});

// GET Multiple
exports.mqttGetAll = async (req, res) => {
    const query = `
      select * from farms
    `
    client.query(query)
    .then( result => res.status(200).json(result) )
    .catch( err => res.status(500).json({ err }) );
};

    // const query = `
    //   select * from farms
    //   where timestamp =~ /(?i)(${place})/
    // `
