const express = require('express');
const volunteers = require('../volunteers.json');

const app = express();
app.use(express.json()); // nécessaire pour les POST car on solicite le body JSON



// GET : TOUS LES VOLUNTEERS OU AVEC FILTRES
app.get('/', (req, res) => {
 res.send('Hello leaderboard!');
});

app.listen(3002, ()=>{
console.log("tessssssst");


})

