const mongoose = require("mongoose")

const clienteShema = mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim:true
    },
    lastName:{
        type: String,
        require:true,
        trim:true
    },
    business:{
        type:String,
        require:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    phone:{
        type:String,
        trim:true
    },
    created:{
        type:Date,
        default:Date.now()
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
})

module.exports = mongoose.model("Cliente",clienteShema )