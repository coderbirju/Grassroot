const mongoose = require('mongoose')

const homeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading : { type: String, required: true },
    desc : {type: String, required: true}
})

module.exports = mongoose.model('Home', homeSchema);
