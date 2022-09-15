const mongoose = require('mongoose');
const fetch = require('node-fetch');
const express = require('express');
const User = require('../../models/user');
const { error } = require('console');
const { response } = require('express');
const router = express.Router();
const mongoString = process.env.DATABASE_URL;

const postOne = ('/post', async (req, res) => {
    try {
        await mongoose.connect(mongoString);

        const data = new User({
            _id: req.body._id,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            website: req.body.website,
            company: req.body.company
        });

        // const data = await User.create({
        //     name: req.body.name,
        //     username: req.body.username,
        //     email: req.body.email,
        //     address: req.body.address,
        //     phone: req.body.phone,
        //     website: req.body.website,
        //     company: req.body.company
        // });

        const dataToSave = await data.save();
        res.status(200).json({
            message: "successful",
            data: dataToSave
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
// Get All
const getAll = ('/getAll', async (req, res) => {
    try{
        await mongoose.connect(mongoString);
        const data = await User.find();
        res.status(200).json({message: "successful", data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
const getOne = ('/get/:id', async (req, res) => {
    try{
        await mongoose.connect(mongoString);
        const data = await User.findById(req.params.id);
        res.status(200).json({message: "successful", data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
const updateOne = ('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        
        await mongoose.connect(mongoString);
        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        
    }
})

//Delete by ID Method
const deleteOne = ('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await mongoose.connect(mongoString);
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

const externalApi = ('/externalApi', async (req, res) => {

    const url = 'https://jsonplaceholder.typicode.com/users';
    const options = {
        "method" : "GET",   
    } 
    await mongoose.connect(mongoString);
    const result = await fetch(url,options)
        .then(res =>res.json()) 
        .catch(error => {
            res.status(400).json({ message: error.message })
        })    

    console.log("RESPONSE:" , result)
    res.status(200).json({message: "successful",result})

});

module.exports = router;

module.exports = {
    getAll,
    getOne,
    postOne,
    updateOne,
    deleteOne,
    externalApi
}


















// //Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

// //Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

// //Get by ID Method
// // router.get('/getOne/:id', (req, res) => {
// //     res.send('Get by ID API')
// // })
// router.get('/getOne/:id', (req, res) => {
//     res.send(req.params.id)
// })

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

// //Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })

// const externalApi = ('external', async (req, res) => {
//     axios.get('https://jsonplaceholder.typicode.com/users')
//     .then((res) => {
//         console.log(`Status: ${res.status}`);
//         console.log('Body: ', res.data);
//     }).catch((err) => {
//         console.error(err);
//     });
// })