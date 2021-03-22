var mqtt = require('mqtt')
var options = {
  clientid: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "node",
  password: "12345",
  keepalive: 60,
  clean: true,
  reconnectPeriod: 5000
}
var client  = mqtt.connect('mqtt://broker', options)

client.on('connect', function () {
  client.subscribe('nodejs/#', function (err) {
    if (!err) {
      client.publish('nodejs', 'Hola desde NodeJS!')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log("Topic:" + topic + " Msg:" + message.toString())
})

setInterval(() => {
    console.log("Running")
}, 5000);