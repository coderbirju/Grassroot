const mongoose =  require('mongoose')

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    desc : {type: String, required: true}
})

module.exports = mongoose.model('Projects', projectSchema);