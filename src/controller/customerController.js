// customerController.js
// Import customer model
Customer = require('../models/customer.model');


// Handle index actions
exports.index = function (req, res) {
    Customer.get(function (err, customers) {
        if (err) {
            res.json({
                status: false,
                message: err,
            });
        }
        res.json({
            status: true,
            message: "Contacts retrieved successfully",
            data: customers
        });
    });
};


// Handle create contact actions
exports.new = function (req, res) {
    var customer = new Customer();
    customer.name = req.body.name;
    customer.email = req.body.email;
    
    //save the customer and check for errors
    customer.save(function (err) {
        if (err) {
            res.json({
                status: false,
                message: err,
            });
        }
        res.json({
            message: 'New customer created!',
            data: customer
        });
    });
};
