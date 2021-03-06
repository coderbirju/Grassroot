const mongoose = require('mongoose');
const express = require('express');
const contactModel = require('../models/contact');
const app = require('../../app');

const router = express.Router();

/*Get Request
- From contact model find heading, desc
- exec query
- then display it in response as doc
- catch the error
*/

router.get('/', async (req, res, next) => {
  try {
    const contactResponse = await contactModel
      .find({})
      .select(
        'linkedIn github email instagram twitter prof_image spotify soundcloud'
      )
      .exec();
    console.log('contactResponse: ', contactResponse);
    return res.status(200).json({
      count: contactResponse.length,
      social_contact: contactResponse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

/* Post request
- create new instance of contact model with values from req.body
- save the result into collection
- return response
- catch any errors
*/

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const contact = contactModel({
      _id: new mongoose.Types.ObjectId(),
      linkedIn: req.body.linkedIn,
      github: req.body.github,
      email: req.body.email ? req.body.email : 'NA',
      instagram: req.body.instagram ? req.body.instagram : 'NA',
      twitter: req.body.twitter ? req.body.twitter : 'NA',
      prof_image: req.body.prof_image ? req.body.prof_image : 'NA',
      spotify: req.body.spotify ? req.body.spotify : 'NA',
      soundcloud: req.body.soundcloud ? req.body.soundcloud : 'NA',
    });

    const response = await contact.save();
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
- All the deatils in contact models are links or image_url
- ex: [ {"propName":"instagram", "value": "insta link"}, {"propName":"github", "value": "www.xxx.com"}]
- Updates contact based on _id provided in the api request
*/

router.patch('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    const result = await contactModel
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

router.delete('/:contactId', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body);
    const id = req.params.contactId;
    const result = await contactModel.remove({ _id: id }).exec();
    return res.status(200).json(result);
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
