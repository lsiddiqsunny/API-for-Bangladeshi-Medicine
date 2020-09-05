var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },

    function(err, db) {
        if (err) throw err;
        var dbo = db.db("MedicineDB");
        dbo.collection("Medicine").findOne({ Price: 35 }, function(err, result) {
            if (err) throw err;
            console.log(result.Name);
            db.close();
        });
    });