var express = require('express');
var router = express.Router();


var response = {
    "records": [
        {
            "Name": "Alfreds Futterkiste",
            "City": "Berlin",
            "Country": "Germany"
        },
        {
            "Name": "Berglunds snabbköp",
            "City": "Luleå",
            "Country": "Sweden"
        },
        {
            "Name": "Centro comercial Moctezuma",
            "City": "México D.F.",
            "Country": "Mexico"
        },
        {
            "Name": "Ernst Handel",
            "City": "Graz",
            "Country": "Austria"
        },
        {
            "Name": "FISSA Fabrica Inter. Salchichas S.A.",
            "City": "Madrid",
            "Country": "Spain"
        },
        {
            "Name": "Galería del gastrónomo",
            "City": "Barcelona",
            "Country": "Spain"
        },
        {
            "Name": "Island Trading",
            "City": "Cowes",
            "Country": "UK"
        },
        {
            "Name": "Königlich Essen",
            "City": "Brandenburg",
            "Country": "Germany"
        },
        {
            "Name": "Laughing Bacchus Wine Cellars",
            "City": "Vancouver",
            "Country": "Canada"
        },
        {
            "Name": "Magazzini Alimentari Riuniti",
            "City": "Bergamo",
            "Country": "Italy"
        },
        {
            "Name": "North/South",
            "City": "London",
            "Country": "UK"
        },
        {
            "Name": "Paris spécialités",
            "City": "Paris",
            "Country": "France"
        },
        {
            "Name": "Rattlesnake Canyon Grocery",
            "City": "Albuquerque",
            "Country": "USA"
        },
        {
            "Name": "Simons bistro",
            "City": "København",
            "Country": "Denmark"
        },
        {
            "Name": "The Big Cheese",
            "City": "Portland",
            "Country": "USA"
        },
        {
            "Name": "Vaffeljernet",
            "City": "Århus",
            "Country": "Denmark"
        },
        {
            "Name": "Wolski Zajazd",
            "City": "Warszawa",
            "Country": "Poland"
        }
    ]
};

var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('houbank', server, {safe: true});

/* GET users listing. */
router.all('/', function (req, res, next) {


    console.log('username in req is:' + req.query.username);
    console.log('password in req is:' + req.query.password);

    db.open(function (err, db) {
        if (!err) {
            console.log('DB connected');
            db.createCollection('customer', {safe: true}, function (err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    collection.find({
                        name: req.query.username,
                        age: parseInt(req.query.password)
                    }).toArray(function (err, docs) {
                        if (docs.length > 0) {
                            console.log('Fetch data from mongodb');
                            res.send(JSON.stringify(response));
                        } else {
                            console.log('fail to login');
                            res.send(JSON.stringify({'records': 'User name or password is inncorrect'}));
                        }
                    });
                }
            });
        } else {
            console.log(err);
        }
    });


    //res.render("users",{title:"Express2"});
});

module.exports = router;
