let ContactModel = require('../models/contact.model')
let CustomerModel = require('../models/customer.model')
let express = require('express')
let router = express.Router()


// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var contactController = require('../controller/contactController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

//create a new customer
// POST localhost:3000/customer
router.post('/customer',(req,res)=>{
    //req.body
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }

    let model = new CustomerModel(req.body)
    model.save()
        .then(doc =>{
            if(!doc || doc.length == 0){
                return res.status(201).send(doc)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//GET
router.get('/customer',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter : email')
    }

    CustomerModel.findOne({
        email : req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//Update
router.put('/customer',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter : email')
    }

    CustomerModel.findOneAndUpdate({
        email : req.query.email
    },req.body,{
        new : true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


//delete
router.delete('/customer',(req,res)=>{
    //return res.send('In delete section');
    
    if(!req.query.email){
        return res.status(400).send('Missing URL parameter : email')
    }

    CustomerModel.findOneAndRemove({
        email : req.query.email
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}) 


router.get('/person',(req,res)=>{
	if(req.query.name){
		res.send(`You have requested a person ${req.query.name}`)
	} else {
		res.send('You have requested a person')
	}	
})


//Params property on the request object
router.get('/person/:name',(req,res)=>{
	res.send(`You have requested a person ${req.params.name}`)
})

router.get('/error',(req,res)=>{
	throw new Error('This is a forced error.')
})