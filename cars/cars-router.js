const express = require("express");

const db = require("../data/dbConnection.js");

const router = express.Router();

//get all cars 
router.get("/", (req, res) => {
    db("cars")
        .then(cars => {
            res.json(cars)
        })
        .catch(err => {
            res.status(500)
                .json({ message: "Could not get cars info" })
        })
})

//get specific car
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("cars")
        .where({ id })
        .first()
        .then(car => {
            if (car) {
                res.status(200)
                .json({ data: car})
            } else {
                res.status(404)
                .json({ message: "No cars by that ID"})
            }
        })
        .catch(err => {
            res.status(500)
                .json({ message: "Failed to access car" })
        })
})

//post a new car
router.post("/", (req, res) => {
    const carData = req.body;

    db("cars")
        .insert(carData)
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(newCarEntry => {
                    res.status(201)
                        .json(newCarEntry);
                })
        })
        .catch(err => {
            console.log("POST ERROR", err)
            res.status(500)
                .json({ message: "Failed to store data" })
        })
})

//edit an existing car
router.put('/:id', (req, res) => {
    const changes = req.body;

    db("cars")
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200)
                    .json({ data: count })
            } else {
                res.status(400)
                    .json({ message: "No car by that ID" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500)
                .json({ message: error.message })
        })
})

//delete an existing car 
router.delete('/:id', (req,res) => {
    db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0){
            res.status(200)
            .json({ data: count })
        } else {
            res.status(404)
            .json({ message: "No car found by that ID"})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500)
        .json({ message: error.message })
    })
})
module.exports = router;