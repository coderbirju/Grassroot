const mongoose = require('mongoose')
const express = require('express')
const homeModel = require('../models/home')
const app = require('../../app')
const { route } = require('../../app')
const { update } = require('../models/home')

const router = express.Router()

/* Get Request
- From homemodel find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/', ( req, res, next ) => {
    homeModel.find()
    .select('heading desc')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            home: docs
        });
    }).catch(err => {
        console.log.err();
        res.status(500).json({
            error: err
        });
    });
});

/* Post request
- create home model
- save the result
- display
- catch the error
*/

router.post('/', (req, res, next) => {
    const home = homeModel({
        _id: new mongoose.Types.ObjectId(),
        heading: req.body.heading,
        desc: req.body.desc
    });
    home
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: "Handling user create request",
            homeItemCreated: home
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

/* Patch
- Using loop to update the values
- this will be an array of object
- ex: [ {"propName":"heading", "value": "new heading"}]
*/
router.patch('/:homeId', (req, res, next) => {
    const id = req.params.homeId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    homeModel.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;