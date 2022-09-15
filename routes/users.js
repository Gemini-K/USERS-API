const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const {
    getAll,
    getOne,
    postOne,
    updateOne,
    deleteOne,
    externalApi
} = require('../src/controllers/apiController')

const router = express.Router();

const mongoString = process.env.DATABASE_URL;

router.get('/getAll', getAll);
router.get('/get/:id', getOne);
router.post('/post', postOne);
router.patch('/update/:id', updateOne);
router.delete('/delete/:id', deleteOne);
router.get('/externalApi',externalApi)

module.exports = router;


