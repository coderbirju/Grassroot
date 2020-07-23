const mongoose = require('mongoose')
const express = require('express')
const skillModel = require('../models/skill')
const app = require('../../app')
const { route } = require('../../app')
const { update } = require('../models/home')

const router = express.Router()

router.get('/', ( req, res, next ) => {
    skillModel.find()
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
    const skill = skillModel({
        _id: new mongoose.Types.ObjectId(),
        language: req.body.language,
        skill_name: req.body.skill_name,
        desc : req.body.desc,
        stars: req.body.skill
    });
    skill
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: "Handling user create request",
            skillItemCreated: skill
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
router.patch('/:skillId', (req, res, next) => {
    const id = req.params.skillId;
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