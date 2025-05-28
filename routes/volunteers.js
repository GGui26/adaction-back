const express = require('express');
var cors = require('cors');
const app = express();

const volunteers = require('../volunteers.json');

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

// filtrage par nom de famille
// app.get('/volunteers/:lastname', (req, res)=>{
//   const filter = req.params.lastname.toLowerCase();
//       const results = volunteers.filter(volunteer =>
//       volunteer.lastname.toLowerCase() === filter
//       );
//     if (results.length > 0) {
//       res.json(results);
//     } else {
//       res.status(404).json({ error: 'Aucun volontaire trouvé avec ce nom de famille' });
//     }
// });

// filtrage par toutes les clés
app.get('/volunteers', (req, res)=>{
  let results = volunteers;
  for (const [key, value] of Object.entries(req.query)){
    results = results.filter(volunteer =>
      volunteer[key] && volunteer[key].toString().toLowerCase() === value.toLowerCase()
    );
  }
  if (results.lenght > 0){
    res.json(results);
  }else{
    res.status(404).json({error : 'Aucun volontaire trouvé avec ces critères'});
  }
});
 



app.listen(port, () => {
  console.log(`serveur démarré sur le port  ${port}`)
})