require('dotenv').config();

const routes = require('./routes/users');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(express.json());
app.use('/api', routes); // This should come after app.use(express.json())

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

