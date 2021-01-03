const mongoose = require('mongoose');
const express = require('express');
const resumeModel = require('../models/resume');
const app = require('../../app');

const router = express.Router();

/* Get Request
- From resume model find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/', async (req, res, next) => {
  try {
    const resumeResponse = await resumeModel
      .find({})
      .select(
        'dateRange company role desc achievements'
      )
      .exec();
    console.log('resumeResponse: ', resumeResponse);
    return res.status(200).json({
      count: resumeResponse.length,
      resume_data: resumeResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

/* Post request
- create new instance of resume model with values from req.body
- save the result into collection
- return response
- catch any errors
*/

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const resume = resumeModel({
      _id: new mongoose.Types.ObjectId(),
      dateRange: req.body.dateRange,
      role: req.body.role,
      company: req.body.company ? req.body.company : 'NA',
      desc: req.body.desc ? req.body.desc : 'NA',
      achievements: req.body.achievements ? req.body.achievements : 'NA'
    });

    const response = await resume.save();
    return res.status(200).json({
      message: 'Handling resume create request',
      resumeCreated: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

/* Patch
- Using loop to update the values
- this will be an array of object
- Updates resume based on _id provided in the api request
*/

router.patch('/:resumeId', async (req, res, next) => {
  try {
    const id = req.params.resumeId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const result = await resumeModel
      .update({ _id: id }, { $set: updateOps })
      .exec();
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
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

router.delete('/:resumeId', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const id = req.params.resumeId;
    const result = await resumeModel.remove({ _id: id }).exec();
    return res.status(200).json(result);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
