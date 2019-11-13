let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rest_api');

let CustomerSchema  = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : true,
        unique : true
    }
})

// Export Contact model
var Customer = module.exports = mongoose.model('customer', CustomerSchema);
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}