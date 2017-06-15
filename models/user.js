'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

 mongoose.connect('mongodb://scrservices:Development2016**@cluster0-shard-00-00-hupjf.mongodb.net:27017,cluster0-shard-00-01-hupjf.mongodb.net:27017,cluster0-shard-00-02-hupjf.mongodb.net:27017/market?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', { config: { autoIndex: true } }, function (err, db) {
    if (err) {
        console.log("Error detectet trying to connect to MongoDb Atlas: " + err);
      } else { }
        console.log("Connected to MongoDb Atlas using mongoose");
});

// declaro un objeto vacio Schema para usarlo cuando guste
var Schema = mongoose.Schema;
// Definir el esquema del model (es decir la colleccion de mi base de datos). Estoy definiendo que los valores siempre van a ingresar como String en un objeto tipo Schema llamado SchemaMsg
var SchemaMsg = Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    fullname: {type: String},
    profession: {type: String},
    phone: {type: String},
    about: {type: String},
    facebook: {type: String},
    Twitter: {type: String},
    Dribbble: {type: String},
    GitHub: {type: String},
    Behance: {type: String},
    CodePen: {type: String},
    Instagram: {type: String},
    startSellingForm: {type: String}, 
    cartButcket: {type: Number},
    enrollmentDay: {type: Date, default: Date.now},
    followersList: {type: String},
    followersNumber: {type: Number},
    followingList:  {type: String},
    followingNumber: {type: Number},
    items:  {type: String},
    itemsNumber:  {type: Number},
    collect: {type: String},
    collectNumber: {type: Number},
    earnings: {type: Number},
    sales: {type: Number},
    avatarPicture: { type: String },
    downloads:  {type: Number},
    authorLikes: {type: Number},
    userId:  {type: String},
    userItemPic: {type: String},
    tittle:  {type: String},
    keyWords:  {type: String},
    typeProduct:  {type: String},
    tools:  {type: String},
    browers:  {type: String},
    Compatible:  {type: String},
    Files:  {type: String},
    Layout:  {type: String},
    support:  {type: String},
    demoUrl:  {type: String},
    descriptionData:  {type: String},
    priceL:  {type: String},
    priceEx:  {type: String},
    filesAdressID:  {type: String},
    image1Url:  {type: String},
    image2Url:  {type: String},
    image3Url:  {type: String},
    itemUrl:  {type: String},
    views: {type: Number},
    likes: {type: Array, index: true}, 
    ItemDownloads: {type: Number},
    author:  {type: String},
    publishStatus:  {type: String},
    SelectedItem: {type: String},
    UserThumbUp:  {type: String},
    versionKey: false
    });


// canditePassword is a parameter sent from server.js
// this.password is the password from the ShemaMsg
SchemaMsg.methods.comparePassword = function(candidatePassword, hashedPassword, cb) {
   bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
        if (err) return cb(err); //if false return err
        return cb(null, isMatch); //if true return true
    });
};


var user = mongoose.model('users', SchemaMsg);
module.exports.users = user;

var item = mongoose.model('items', SchemaMsg);
module.exports.items = item;


