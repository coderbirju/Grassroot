const mongoose =  require('mongoose')

const resumeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    resumeItem : { type: String, required: true },
    resumeItem2 : {type: String, required: true}
})

module.exports = mongoose.model('Resume', resumeSchema);