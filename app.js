const express = require('express')
var cors = require('cors')
const app = express()

const volunteers = require('./volunteers.json');

app.use(cors())

const port = 3001

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/volunteers', (req, res) => {
  res.json(volunteers);
});



app.listen(port, () => {
  console.log(`test ${port}`)
})