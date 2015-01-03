var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About Express' });
});

/* GET user list page */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET new user page */
router.get('/newuser', function(req, res) {
    res.render('newuser', {title: 'Add new user'});
});

/* POST to add user service */
router.post('/adduser', function(req, res) {
    // Set the internal db variable.
    var db = req.db;
    
    // Get form values, which rely on the name attributes.
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    
    // Set the collection.
    var collection = db.get('usercollection');
    
    // Submit to the database.
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            res.send("Error adding to database.");
        } else {
            res.location("userlist");
            res.redirect("userlist");
        }
    });
});

module.exports = router;
