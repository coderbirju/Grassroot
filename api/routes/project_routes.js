const mongoose = require('mongoose');
const express = require('express');
const projectModel = require('../models/project');

const router = express.Router();

/* Get Request
- From project model find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/', async (req, res, next) => {
  try {
    const projectResponse = await projectModel
      .find({})
      .select('name desc link stars tool')
      .exec();
    console.log('projectResponse: ', projectResponse);
    return res.status(200).json({
      count: projectResponse.length,
      projects: projectResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

/* Post request
- create new instance of project model with values from req.body
- save the result into collection
- return response
- catch any errors
*/

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const project = projectModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      desc: req.body.desc,
      link: req.body.link,
      stars: req.body.stars,
      tool: req.body.tool,
    });

    const response = await project.save();
    return res.status(200).json({
      message: 'Handling user create request',
      projectCreated: response,
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
- ex: [ {"propName":"name", "value": "new name"}, {"propName":"desc", "value": "Some desc"}, {"propName":"link", "value": "www.xxx.com"}]
- Updates project based on _id provided in the api request
*/

router.patch('/:projectId', async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const result = await projectModel
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

router.delete('/:projectId', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const id = req.params.projectId;
    const result = await projectModel.remove({ _id: id }).exec();
    return res.status(200).json(result);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
