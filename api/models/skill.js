const mongoose =  require('mongoose')

const skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    heading : { type: String, required: true },
    desc : {type: String, required: true}
})

module.exports = mongoose.model('Skills', skillSchema);