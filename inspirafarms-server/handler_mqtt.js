const mqtt = require('mqtt');
// const loadData = require('./influx_handler');
// const hello = require('./influx_handler');

// influx
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

loadData = async (sessionId,energyMeter,roomTemperature, roomHumidity, fieldTemperature, timeStamp) => {
  try {
    const rows = [{
        measurement: 'farms',
        tags: { sessionId: sessionId },
        fields: { energyMeter: energyMeter, roomTemperature,roomHumidity, fieldTemperature},
        timestamp: new Date(Date.parse(timeStamp))
    }];
    await client.writePoints(rows);
    console.log('Data stored successfully!');
  } catch (err) {
    console.log(`Error while processing ${err}`);
  }
};
// end influx

const host = 'mqtt://test.mosquitto.org';
const keepalive = 60;
const port = 1883;
const protocol = 'mqtts';
var rejectUnauthorized = false;

const mqttClient = mqtt.connect(host, port, protocol, keepalive, rejectUnauthorized);

// Mqtt error calback
mqttClient.on('error', (err) => {
  console.log(err);
  mqttClient.end();
});

// Connection callback
mqttClient.on('connect', () => {
  console.log(`mqtt client connected`);
});

// mqtt subscriptions
mqttClient.subscribe('a12f832c-c6d6', {qos: 0});

// When a message arrives, console.log it
mqttClient.on('message', function (topic, message) {
//   message is buffer
  var stringBuf = message && message.toString('utf-8');
//   var stringBuf = message.toString()

//   console.log("==================")
//   console.log(message.toString());
//   console.log(stringBuf);
//   console.log("======================")
  try {
      var json = JSON.parse(stringBuf);
      console.log("--------")
      console.log(json)
      console.log("--------")
      var newObject = {};

      var sessionId = json.sessionId;
      var roomTemperature = json.roomTemperature;
      var roomHumidity = json.roomHumidity;
      var fieldTemperature = json.fieldTemperature;
      var energyMeter = json.energyMeter;
    //   var timeStamp = json.timeStamp;
      var timeStamp = new Date(Date.parse(json.timestamp));

      newObject['sessionId'] = json.sessionId;
      newObject['roomTemperature'] = json.roomTemperature;
      newObject['roomHumidity'] = json.roomHumidity;
      newObject['fieldTemperature'] = json.fieldTemperature;
      newObject['energyMeter'] = json.energyMeter;
      newObject['timeStamp'] = new Date(Date.parse(json.timestamp))


    //   sessionId = 'rtr-2qkl-2183'
    //   energyMeter = 27389
    //   timeStamp = new Date(Date.parse('2022-02-03T03:16:00.892Z'))
    //   loadData(sessionId, energyMeter, timeStamp);
      loadData(sessionId,energyMeter,roomTemperature, roomHumidity, fieldTemperature, timeStamp)

      console.log("+++++++++")
      console.log("newObject")
      console.log(newObject);
      console.log("++++++++++")
   
    } catch (error) {
        console.error("mqtt kakataa bana, shaaka");
        console.error(stringBuf);      
    }
});

// Sends a mqtt message to topic: mytopic
function sendMessage(message) {
  mqttClient.publish('a12f832c-c6d6', message);
}

mqttClient.on('close', () => {
  console.log(`mqtt client disconnected`);
});
