let express = require('express')
let app  = express()

let apiRoute = require('./routes/api')
let path = require('path')
let bodyParser = require('body-parser')
const config = require('../config/config')

app.use(bodyParser.json())
app.use((req,res,next) =>{
	//console.log(`${new Date().toString()} =>${req.originalUrl}`,req.body)
	next()
})

app.use(apiRoute)

// Use Api routes in the App
app.use(express.static('public'))

//Handler for 404 : Resource not found
app.use((req,res,next)=>{
	res.status(404).send('API End point not found!!')
})

app.use((err,req,res,next)=>{
	console.log(err.stack)
	res.sendFile(path.join(__dirname+'../public/505.html'))
})

app.listen(config.app.port,() =>console.info(`Server has started on  ${config.app.port}`))