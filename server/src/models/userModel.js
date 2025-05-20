const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    unique:true,
},
role:{
   type:String, default:'user', enum:['user']
},
kyc:{
    addharNumber:String,
    panNumber:String,
    verified:{
        type:Boolean,
        default:false,
    },
    kycDoc:{
        type:String,
        default:null,
    },
},
wallet:{
    balance:{type:Number, default:0,min:0},
    transactions:[{
        type:{
            type:String,enum:['add','withdrawal','transfer','loan-repayment','loan-disbursement','scheme-contribution'],
        },
        amount:{
            amount:Number,
            status:{type:String,enum:['pending','approved','rejected'],default:'pending'},
            timestamp:{type:Date,default:Date.now}
        }
    }],
    withdrawalRequests:[
        {
            amount:Number,
            status:{type:String,enum:['pending','approved','rejected'], default:'pending'},
            requestedAt:{type:Date,default:Date.now},
            processedAt:Date,
        }
    ]
}


});