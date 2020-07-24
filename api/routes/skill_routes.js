const mongoose = require('mongoose')
const express = require('express')
const skillModel = require('../models/skill')
const app = require('../../app')
const { route } = require('../../app')
const { update } = require('../models/home')

const router = express.Router()


/* Get Request
- From skillModel find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/',  async ( req, res, next ) => {
    try
    {
        const skillResponse = await skillModel.find({}).select('language skill_name desc stars').exec();
        console.log('skillResponse: ', skillResponse);
        return res.status(200).json({
           count:  skillResponse.length,
           projects: skillResponse
        });
    }
    catch (err){
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
});


/* Post request
- create skillModel
- save the result
- display
- catch the error
*/

router.post('/', async (req, res, next) => {
    try {
        console.log('req.body: ', req.body);
        const skill = skillModel({
            _id: new mongoose.Types.ObjectId(),
            language: req.body.language,
            skill_name: req.body.skill_name,
            desc : req.body.desc,
            stars: req.body.skill
        });
        const skillResponse = await skill.save();
        return res.status(200).json({
            message: "handling skill create request",
            home: skillResponse
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:err
        });
    }
});

/* Patch
- Using loop to update the values
- this will be an array of object
- ex: [ {"propName":"heading", "value": "new heading"}]
*/

router.patch('/:skillId', async(req,res,next) => {
    try {
        console.log('req.body: ', req.body);
        const id = req.params.skillId;
        const updateOps = {}
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await skillModel.update({_id: id}, {$set: updateOps}).exec();
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }
});

/*
Delete
- pass the id
- remove will be executed
- result will be returned
- else handling the error using catch
*/

router.delete('/:skillId', async(req, res, next) => {
    try {
        console.log('req.body: ', req.body);
        const id = req.params.skillId;
        const result = await skillModel.remove({_id: id}).exec();
        return res.status(200).json(result)
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }

});

module.exports = router;