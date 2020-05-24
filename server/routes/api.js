//define all of the API endpoints
const express=require('express')
const router=express.Router()
const User=require('../models/user')

require('dotenv').config();

const jwt=require('jsonwebtoken')

const mongoose=require('mongoose')

//1:connect to database
const db="mongodb+srv://weicao:caowei1994@cluster0-lvcsa.mongodb.net/eventsdb?retryWrites=true&w=majority"
//const db="mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-lvcsa.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, { useUnifiedTopology: true,useNewUrlParser: true  } ,err=>{
    if(err){
        console.error("Error!"+err)
    }else{
        console.log('Connected to mongodb')
    }
})
//2:in user.js create a schema -this is like a blueprint=> the objects that mongoDB expects
//3: create a model called user

//middleware to vertify token
function verifyToken(req,res,next){
   //1:if the authorization key is not present as part of the header
   if(!req.headers.authorization){
       return res.status(401).send('1:unauthorized request(there is no key called Authorization)')
   }
   //if the authorization property is present, extract the token value from the bearer token
   let token=req.headers.authorization.split(' ')[1]
   if(token==='null'){
       return res.status(401).send('2:unauthorized request(token is null)')
   }
   //2:verify method returns the decoded token only it is valid,so if the token is invalid, it implies there is no payload.
   let payload=jwt.verify(token, 'secretKey')
   //console.log(payload);
   if(!payload){
       return res.status(401).send('3:unauthorized request(this is a fake token)')
   }
   //assign the payload subjest to the request user id
   //then pass on the execution to the next handler
   req.userId=payload.subject
   next()
}

router.get('/',(req,res)=>{
    res.send('From API route');
})

router.post('/register',(req,res)=>{
    //extract user data from req obj
    let userData=req.body
    //convert to the model that mongoose understand
    let user=new User(userData)
    //save in db
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
            //payload is an object which contain the registered userID  
            let payload={subject:registeredUser._id}
            //json web token stored in token variable
            let token=jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login',(req,res)=>{
    //first extract the userData
    let userData=req.body
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }else if(user.password!==userData.password){
                //password in the db not equal to the pass from the front-end
                res.status(401).send('Invalid password')
            }else{
                let payload={subject:user._id}
                let token=jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

// router.post('login',(req,res)=>{
//   let userData=req.body
//   let user=new User(userData)
//   user.save((error,registeredUser)=>{
//     if(error){
//       console.log(error)
//     }else{
//       res.status(200).send(registeredUser)
//     }
//   })
// })

router.get('/events',(req,res)=>{
    //array and the element is object
    let events=[
         {
            "_id": "1",
            "name": "GMU graduation ceremony",
            "description": "For master degree student",
            "date": "2019-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Ascending DC",
            "description": "this is a start company",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Ascending NYC",
            "description": "this is a branch",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Ascending LA",
            "description": "this is a branch",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Ascending Boston",
            "description": "this is a branch",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Ascending Austin",
            "description": "this is a branch",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
    res.json(events)
})

//when I make a request to special event route
//1:token is verified;2:the code in particular API gets executed
//so if the user tries to send invalid token, the API code don't get executed
router.get('/special',verifyToken,(req,res)=>{
    let events=[
          {
            "_id": "1",
            "name": "GMU graduation ceremony",
            "description": "For master degree student",
            "date": "2019-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
    res.json(events)
})

module.exports=router
