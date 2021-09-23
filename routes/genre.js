const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const gen = [
    { "id": 1, "name": "Action" },
    { "id": 2, "name": "Comedy" },
    { "id": 3, "name": "Drama" },
    { "id": 4, "name": "Horror" },
    { "id": 5, "name": "Mystery" },
    { "id": 6, "name": "Romance" },
    { "id": 7, "name": "Thriller" },
    { "id": 8, "name": "Western" }
]

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }
});

const Genre = new mongoose.model('Genre', genreSchema);

router.get('/all', async (req, res) => {
    const genres = await Genre.find().sort('name');
    return res.status(200).json(genres);
})

router.get('/:id', (req, res) => {
    const result = genres.find(c => c.id === parseInt(req.params.id));
    if (result)
        return res.status(200).json(result);
    return res.status(404).send("Not Found");
})

router.post('/add', (req, res) => {
    const { error } = validateGenre(req.body);
    console.log(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    genre.save((err, updatedGenre) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.status(200).send(updatedGenre);
        }
    })
});

// Latest version uses this. [https://github.com/sideway/joi/issues/2145]
function validateGenre(genre) {
    console.log(genre);
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });

    return schema.validate(genre);
}

module.exports = router;