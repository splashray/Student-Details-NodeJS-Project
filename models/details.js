const mongoose = require('mongoose')


const DetailSchema = new mongoose.Schema({
    name:{
       type:String,
       required: [true, 'Must provide name'],
       trim: true,
       maxlength: [30, 'Name can not be more than 20 characters']
    },
    sex:{
        type:String,
        required: [true, 'Must provide sex'],
        trim: true,
        maxlength: [10, 'Sex can not be more than 20 characters']
     },
     dob:{
        type:String,
        required: [true, 'Must provide Date of Birth'],
        trim: true,
        maxlength: [20, 'DOB can not be more than 20 characters']
     },
     department:{
        type:String,
        required: [true, 'Must provide department'],
        trim: true,
        maxlength: [20, 'Department can not be more than 20 characters']
     },
    type:{
       type: Boolean,
       default: false
    },
})

module.exports = mongoose.model('Detail', DetailSchema)