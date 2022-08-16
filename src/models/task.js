const mongoose = require('mongoose');
const {Schema} = mongoose;


const TaskSchema = new Schema({
    title: { type: String, required: true},
    description : {type: String, requred: true}
})

module.exports = mongoose.model('Taks', TaskSchema);