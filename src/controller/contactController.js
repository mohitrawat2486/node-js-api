// contactController.js
// Import contact model
Contact = require('../models/contact.model');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: false,
                message: err,
            });
        }
        res.json({
            status: true,
            message: "Customer retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
  
    /*********file handle start**********/
    // Decoding base-64 image
    function decodeBase64Image(dataString){
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = {};

        if (matches.length !== 3)  {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        return response;
    }
    
    // Regular expression for image type:
    // This regular image extracts the "jpeg" from "image/jpeg"
    var imageTypeRegularExpression      = /\/(.*?)$/;      

    // Generate random string
    var crypto                          = require('crypto');
    var seed                            = crypto.randomBytes(20);
    var uniqueSHA1String                = crypto
                                            .createHash('sha1')
                                            .update(seed)
                                            .digest('hex');    
    
    
    var base64Data = req.body.profile_image;                                       
    var imageBuffer                      = decodeBase64Image(base64Data);
    var userUploadedFeedMessagesLocation = __dirname+'/uploads/';
    var uniqueRandomImageName            = 'image-' + uniqueSHA1String;
    var imageTypeDetected                = imageBuffer
                                                .type
                                                .match(imageTypeRegularExpression);
    var userUploadedImagePath            = userUploadedFeedMessagesLocation+uniqueRandomImageName +'.' +imageTypeDetected[1];                                            
    
     // Save decoded binary image to disk
    try {
        require('fs').writeFile(userUploadedImagePath, imageBuffer.data,function(){
            console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
        });
    }
    catch(error){
        console.log('ERROR:', error);
    }
 
    /*********file handle end**********/
        
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.profile_image = userUploadedImagePath;
    
    //save the contact and check for errors
    contact.save(function (err) {
             
        if (err) {
            res.json({
                status: false,
                message: err,
            });
        }
        res.json({
            status : true,
            message: 'New contact created!',
            data: contact
        });
    });
};


// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        // save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
                    status: "success",
                    message: 'Contact deleted'
                });
    });
};