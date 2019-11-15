// contactModel.js
var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost:27017/rest_api',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

//mongoose.connect('mongodb://myUserAdmin:abc123@domain.com:27017/rest_api', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// Setup schema
var contactSchema = new mongoose.Schema({
    contact_id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    profile_image: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

contactSchema.plugin(AutoIncrement, {id:'contact_id_seq',inc_field: 'contact_id'});

// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}