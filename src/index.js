let express = require('express')
let app  = express()
/*let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let contactRoute = require('./routes/contact')*/

let apiRoute = require('./routes/api')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use((req,res,next) =>{
	console.log(`${new Date().toString()} =>${req.originalUrl}`,req.body)
	next()
})

//app.use(personRoute)
//app.use(customerRoute)
//app.use(contactRoute)
//app.use(apiRoute)
// Use Api routes in the App
app.use('/api', apiRoute);
app.use(express.static('public'))

//Handler for 404 : Resource not found
app.use((req,res,next)=>{
	res.status(404).send('We think you are lost')
})

app.use((err,req,res,next)=>{
	console.log(err.stack)
	res.sendFile(path.join(__dirname,'../public/505.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT,() =>console.info(`Server has started on  ${PORT}`))