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



server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db
    .findById(id)

    .then(user => {
        if(user){
            res.status(200).json(user)
        }
        res.status(404).json({ error: "The user with the specified ID does not exist."})
    })
    .catch(error => {
        res.status(500).json({error: "The user information could not be retrieved"})
    })

})



// post request 

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;

    if(!name && !bio){
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



// delete request

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(removed => {
        if (removed) {
            res.status(200).json({ message: "user was removed", removed})
        }else{
            res.status(404).json({ message: "user not found"})
        }
    })
    .catch(error => {
        console.log("error on delete /users/:id", error);
        res.status(500).json({ errorMessage: "error removing the user"})
    })
})

// Put request 

server.put('/api/users/:id', (req , res)=> {
    const id = req.params.id;
    const { name,bio} = req.body;
    
    
    if(!name && !bio){
        res.status(400).json({error: "Please provide name and bio for the user."})
    }

    db
    .update(id, {name,bio})

    .then(user => {
        res.status(201).json(`User ${id} has been updated name: ${name} and bio: ${bio}`);
    })
    .catch(error => {
        console.log("error with post", error);
        res.status(500).json({errorMessage: "User information could not be modified"})
    })
})



const port = 4000
server.listen(port, () => console.log(`\n API running on port ${port}##\n`))