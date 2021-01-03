const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateRange : { type: String, required: true },
    company : {type: String, required: true },
    role : {type: String, required: true },
    desc : {type: String, required: true },
    achievements : {type: Array }
})

module.exports = mongoose.model('Resume', resumeSchema);