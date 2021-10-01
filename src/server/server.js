const express = require('express')
const fs = require('fs');
var cors = require('cors')
const app = express()
const port = 8080

var corsOptions

if(process.env.NODE_ENV === "development"){
  corsOptions = {
    origin: '*',
  }
}
else if(process.env.NODE_ENV === "production"){
  corsOptions = {
    origin: 'moniqueandliam.com',
  }
}

app.use(cors(corsOptions))

app.listen(port, () => {
  console.log(`Monique and Liam listening at http://localhost:${port}`)
})

app.get("/getParties",(req,res) => {
  var data = fs.readFileSync(__dirname + '/parties.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array

  console.log(data);
  res.send({ parties: data })
})
