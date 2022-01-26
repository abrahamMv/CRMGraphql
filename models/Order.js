const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    order:{
        type:Array,
        require:true
    },
    total:{
        type:Number,
        require:true
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Cliente'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    state:{
        type:String,
        default:'PENDIENTE'
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Order',OrderSchema )