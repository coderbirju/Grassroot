const mongoose =  require('mongoose')

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    number : {type: String, required: true}
})

module.exports = mongoose.model('Contact', contactSchema);