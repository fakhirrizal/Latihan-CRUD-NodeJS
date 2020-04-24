const express = require('express')
const app = express.Router(); // biar bisa jadi router
const bodyParser = require('body-parser');  // extract the entire tag <body>, pakenya req.body
                                            // parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
                                            // passport js

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var get_con_db = require('../config.js');
var con = get_con_db.config;
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

app.get('/', function(req, res){
    con.query("SELECT a.* FROM sample_data a", function (err, result) {
        if (err) throw err;
        res.render('crud/list',{datane :result});
        // console.log("Database created");
    });
})   

app.get('/insert', function(req, res){
    res.render('crud/insert');
})

app.post('/save', function(req, res){
	let query  = 'INSERT INTO sample_data VALUES ("","'+req.body.nama+'","'+req.body.negara+'")';
	con.query(query,function(err){
		res.redirect('/crud');
	})
})

app.get('/edit/:id',function(req,res){
    let par =  req.params;
    let query =  `SELECT * FROM sample_data WHERE id=${par['id']}`;
    con.query(query,function(err,rows){
        res.render('crud/edit',{datane:rows});
    })
})

app.post('/update',function(req,res){
    let query = 'UPDATE sample_data SET name="'+req.body.nama+'",country="'+req.body.negara+'" WHERE id="'+req.body.id+'"';
    con.query(query,function(err){
        res.redirect('/crud');
    })
})

app.get('/delete/:id',function(req,res){
    let par =  req.params;
    let query =  `DELETE FROM sample_data WHERE id=${par['id']}`;
    con.query(query,function(err){
        res.redirect('/crud');
    })
})

module.exports = app; // ini untuk mengekspor apa2 yg ada disini agar bisa dibaca oleh js laen
