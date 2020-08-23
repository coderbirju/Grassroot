const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  link: { type: String, required: true },
  skill_name: { type: String, required: true },
  desc: { type: String, required: true },
  logo: { type: String, required: true },
});

module.exports = mongoose.model('Skills', skillSchema);
