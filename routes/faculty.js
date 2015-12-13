/**
 * Created by mengleisun on 12/12/15.
 */
var express = require('express');
var Faculty     = require('../models/faculty').Faculty;
var FacultyHandler = express.Router();
var map = {};
map["UFL"] = "University of Florida";
map["UF"] = "University of Florida";
map["UCI"] = "University of California, Irvine";
map["CMU"] = "Carnegie Mellon University";
map["UMKC"] = "University of Missouri - Kansas City ";
map["UND"] = "University of Notre Dame";
map["UO"] = "University of Oregon";

// middleware to use for all requests some new
FacultyHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});


// on routes that end in /dataset
// ----------------------------------------------------
FacultyHandler.route('/')
    // get the faculty list
    .get(function(req, res){
        Faculty.find(function(err, result){
            if (err)
                res.send(err);
            res.json(result);
        });
    })
    .post(function(req, res) {
        var faculty = new Faculty();
        faculty.Name = "Menglei Sun";
        faculty.save(function(err) {
            if (err)
                res.send(err);
        })
        res.send("success");
    });
FacultyHandler.route('/name/:name')
    // query faculty name
    .get(function(req, res){
        Faculty.find({Name: req.params.name}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    });
FacultyHandler.route('/university/:value')
    // query faculty name
    .get(function(req, res){
        var input = req.params.value;
        console.log(input);
        if (input in map) {
            input = map[input];
        }
        Faculty.find({University: new RegExp(input, "i")}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    });
FacultyHandler.route('/department/:department')
    // query faculty name
    .get(function(req, res){
        Faculty.find({Department: new RegExp(req.params.department,"i")}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    });
FacultyHandler.route('/interest/:interest')
    // query faculty name
    .get(function(req, res){
        Faculty.find({ResearchInterest: new RegExp(req.params.interest,"i")}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        })
    });
FacultyHandler.route('/all/:value')
    // query faculty name
    .get(function(req, res){
        var input = req.params.value;
        if (input in map) {
            input = map[input];
        }
        Faculty.find({$or:[{Name: new RegExp(input, "i")},{Department: new RegExp(input, "i")},
            {University: new RegExp(input, "i")},{ResearchInterest: new RegExp(input,"i")}]}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

module.exports = FacultyHandler;