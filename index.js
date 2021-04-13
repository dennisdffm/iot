var mqtt = require('mqtt')
var options = {
  clientid: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: "node",
  password: "12345",
  keepalive: 60,
  clean: true,
  reconnectPeriod: 5000
}
var client = mqtt.connect('mqtt://broker', options)

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

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: 'admin',
  connectionLimit: 5
});
pool.getConnection()
  .then(conn => {

    conn.query("SELECT 1 as val")
      .then((rows) => {
        console.log(rows); //[ {val: 1}, meta: ... ]
        //Table must have been created before 
        // conn.query(" CREATE TABLE myTable (id int, val varchar(255)) ");
        return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      })
      .then((res) => {
        console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err);
        conn.end();
      })

  }).catch(err => {
    //not connected
  });