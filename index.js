// implement your API here
const express = require('express');

// getting data

const db = require('./data/db')



const server = express();


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


const port = 4000
server.listen(port, () => console.log(`\n API running on port ${port}##\n`))