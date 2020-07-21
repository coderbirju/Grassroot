import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    language : { type: String, required: true },
    skill_name : { type: String, required: true },
    desc : {type: String, required: true},
    stars : {type: String, required: true}
})

module.exports = mongoose.model('Skills', skillSchema);