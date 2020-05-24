//this model used to create and update and del documents in the db

//mongoose provides MongoDB object Mapping(translates the data in db to js object for use in app)
//2:create a schema -this is like a blueprint=> the objects that mongoDB expects
const mongoose=require('mongoose')

const Schema=mongoose.Schema
const userSchema=new Schema({
    email:String,
    password:String
})

//3:create this model user(model name); users:collection in the db
module.exports=mongoose.model('user',userSchema,'users')

