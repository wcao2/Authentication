const express=require('express');
const bodyParser=require('body-parser');
//To avoid "Access-Control-Allow-Origin",cos front-end run on the diff port compare with back-end
const cors= require('cors');

const PORT=3000;
//have a separate route for all API requests
const api=require('./routes/api');

const app=express()

app.use(cors())
//specify body parser to handle json data
app.use(bodyParser.json())

//if make req to localhost:3000/api, the server knows use api route
//split the code into logical modules or files to keep things nice and neat in one place
app.use('/api',api)

app.get('/',function(req,res){
    res.send('hello from server')
})

app.listen(PORT,()=>{
    console.log('Server running on localhost: '+PORT)
})