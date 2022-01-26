const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    existence:{
        type:Number,
        require:true,
        trim:true
    },
    price:{
        type:Number,
        require:true,
        trim:true
    },
    created:{
        type:Date,
        default:Date.now()
    }

})

productSchema.index({name: 'text'});

module.exports = mongoose.model("Product",productSchema)