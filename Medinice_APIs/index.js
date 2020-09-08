var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var str = "";


app.route('/search/name').get(function(req, res) {
    MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },

        function(err, db) {
            if (err) throw err;
            var dbo = db.db("MedicineDB");
            var Name = req.query.name;
            dbo.collection("Medicine").find({ 'Name': new RegExp(Name, 'i') }).toArray(function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    str = str + "  Medicine Name:  " + result[i].Name + "</br>";
                }
                res.send(str);
                db.close();
            });
        });


});

app.route('/getAll').get(function(req, res) {

    MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },

        function(err, db) {
            if (err) throw err;
            var dbo = db.db("MedicineDB");
            dbo.collection("Medicine").find({}).toArray(function(err, result) {
                if (err) throw err;
                for (var i = 0; i < result.length; i++) {
                    str = str + "  Medicine Name:  " + result[i].Name + "</br>";
                }
                res.send(str);
                db.close();
            });
        });

});
app.get('/', function(req, res) {
    res.send('Welcome to Bangladeshi Medicine Information Center.');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});