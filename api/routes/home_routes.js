const mongoose = require('mongoose')
const express = require('express')
const homeModel = require('../models/home')
const app = require('../../app')
const { route } = require('../../app')
const { update, updateOne, remove } = require('../models/home')

const router = express.Router()

/* Get Request
- From homemodel find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/',  async ( req, res, next ) => {
    try
    {
        const homeResponse = await homeModel.find({}).select('heading desc').exec();
        console.log('homeResponse: ', homeResponse);
        return res.status(200).json({
           count:  homeResponse.length,
           projects: homeResponse
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
- create home model
- save the result
- display
- catch the error
*/

router.post('/', async (req, res, next) => {
    try {
        console.log('req.body: ', req.body);
        const home = homeModel({
            _id: new mongoose.Types.ObjectId(),
            heading: req.body.heading,
            desc: req.body.desc
        });
        const homeResponse = await home.save();
        return res.status(200).json({
            message: "handling home create request",
            home: homeResponse
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
router.patch('/:homeId', async(req,res,next) => {
    try {
        console.log('req.body: ', req.body);
        const id = req.params.homeId;
        const updateOps = {}
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        const result = await homeModel.update({_id: id}, {$set: updateOps}).exec();
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

router.delete('/:homeId', async(req, res, next) => {
    try {
        console.log('req.body: ', req.body);
        const id = req.params.homeId;
        const result = await homeModel.remove({_id: id}).exec();
        return res.status(200).json(result)
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    }

});

module.exports = router;