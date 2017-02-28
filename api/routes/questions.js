var express = require('express');
var config = require('../../config')();
var Question = require('../models/question');
var router = express.Router();

module.exports = router;

// Define the question api middleware
router.use(function(req, res, next) {
    // TODO Sanity check
    next();
});


router.route('/')
// Get All Questions
    .get(function(req, res){
        Question.find(function(err, question) {
            if (err)
                res.send(err);

            res.json(question);
        });
    });
//Instantiating the Model - An instance of Model represents a mongodb document
/*var question1 = new Question({
 title: "https://www.123test.com/spatial-reasoning-test/items//item1/uitgevouwen.png",
 options: [
 {
 option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed1.png",
 },{
 option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed2.png",
 },{
 option: "https://www.123test.com/spatial-reasoning-test/items/item1/goed3.png",
 },{
 option: "https://www.123test.com/spatial-reasoning-test/items/item1/fout.png",
 }],
 answer: null,
 selected: null,
 type: "image"
 });
 question1.save(function(err, res){
 if (err)
 console.log(err);

 console.log(res, 'question1 created');
 });
var question2 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item2/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item2/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question2.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question3 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item3/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item3/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question3.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question4 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item4/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item4/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question4.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question5 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item5/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item5/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question5.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question6 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item6/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item6/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question6.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question7 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item7/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item7/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question7.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question8 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item8/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item8/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question8.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question9 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item9/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item9/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question9.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});
var question10 = new Question({
    title: "https://www.123test.com/spatial-reasoning-test/items//item10/uitgevouwen.png",
    options: [
        {
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed1.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed2.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/goed3.png",
        },{
            option: "https://www.123test.com/spatial-reasoning-test/items/item10/fout.png",
        }],
    answer: null,
    selected: null,
    type: "image"
});
question10.save(function(err, res){
    if (err)
        console.log(err);

    console.log(res, 'question1 created');
});*/


/*
 var user2 = new User({
 firstName:"Database",
 lastName: "Test",
 email: "thumphries5@hotmail.com",
 username: 'test',
 password:'test',
 admin: false

 });

 //Saving the model instance to the DB
 user1.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'user1 created');
 });

 user2.save(function(err, res){
 if (err)
 res.send(err);
 console.log(res, 'user2 created');
 });
 */



module.exports = router;