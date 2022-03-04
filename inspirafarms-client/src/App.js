import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchUsers, fetchMqtt } from './api/api';
const axios = require('axios');

function App() {
  const [userData, setUserData] = useState([]);
  const [mqttData, setMqttData] = useState([]);
  console.log(userData);
  console.log("++===========++")
  console.log(mqttData);

    useEffect(() => {
      let mounted = true;
      fetchUsers()
        .then(items => {
          if(mounted) {
            setUserData(items)
          }
        })
      return () => mounted = false;
    }, [])

      useEffect(() => {
      let mounted = true;
      fetchMqtt()
        .then(items => {
          if(mounted) {
            setMqttData(items)
          }
        })
      return () => mounted = false;
    }, [])


  return (
    <div className="App">
          <h2>InspiraFarms</h2>
      <hr/>
      <div>
         Learn react
         {/* {userData.map(item => <li key={item.id}>{item.userName}</li>)} */}
        {userData.map((user, index) => {
          return (
              <div key={user.id} >
                <p>{user.userName}</p>
                <p>{user.companyName}</p>
                <p>{user.coldRoomName}</p>
              </div>
          );
        })}

        {/* "time": "2022-03-04T11:58:00.000Z",
        "energyMeter": 50872,
        "fieldTemperature": 12,
        "roomHumidity": "83.1",
        "roomTemperature": 3,
        "sessionId": "tr-2qkl-4156" */}
        <hr/>
        {mqttData.map((mqtt, index) => {
          return (
              <div key={mqtt.sessionId} >
                <span>{mqtt.energyMeter}</span>
                <span>{mqtt.fieldTemperature}</span>
                <span>{mqtt.roomHumidity}</span>
                <span>{mqtt.roomTemperature}</span>
                <span>{mqtt.roomTemperature}</span>
              </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
