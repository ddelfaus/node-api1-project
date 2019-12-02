// implement your API here
const express = require('express');

// getting data

const db = require('./data/db')



const server = express();


server.use(express.json());


// get request 
server.get('/', (req, res) =>{
    res.send({ api: "up and running.."})
})

server.get('/api/users', (req, res) => {
    db.find()

    .then(users => {
        res.status(200).json(users)
    })

    .catch( error => {
        console.log('error on GET /hubs', error);
        res.status(500).json({ errorMessage: "error getting list of hubs from database"})

    })
})


// post request 

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;

    if(!name || !bio){
        res.status(400).json({error: "Please provide name and bio for the user."})
    }

    db
    .insert({name,bio})

    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        console.log("error with post", error);
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    })
})


const port = 4000
server.listen(port, () => console.log(`\n API running on port ${port}##\n`))