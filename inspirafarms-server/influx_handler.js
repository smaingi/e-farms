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

loadData = async () => {
  try {
    const rows = [...new Array(rcount)].map((r) => {
      return {
        measurement: 'farms',
        tags: { sessionId: 'localhost',  },
        fields: { uname: randomUser() },
        timestamp: new Date(_.random(startTS, endTS)),
      };
    });
    await client.writePoints(rows);
    console.log('Data stored successfully!');
  } catch (err) {
    console.log(`Error while processing ${err}`);
  }
};

// test me
// sessionId = 'rtr-2qkl-2193'
// energyMeter = 27329
// timeStamp = new Date(Date.parse('2022-02-03T03:16:00.692Z'))
// loadData(sessionId, energyMeter, timeStamp);
