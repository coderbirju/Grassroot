const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  linkedIn: { type: String, required: true },
  github: { type: String, required: true },
  email: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  spotify: { type: String },
  soundcloud: { type: String },
  prof_image: { type: String },
});

module.exports = mongoose.model('Contact', contactSchema);
