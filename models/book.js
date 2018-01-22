var mongoose = require('mongoose');

//schema for book

var bookSchema = mongoose.Schema({

    title : {
        type:String,
        required:true
    },

    genre : {
        
        type:String,
        required:true
    },
    description : {

        type:String
    },
    author : {
        type:String,
        required:true
    },
    publisher : {
        type:String
    },
    pages : {
        type:String
    },
    image_url : {
        type:String
    },
    buy_url : {
        type:String
    },
    create_date:{
        type:Date,
        default:Date.now
    }

});
var Book = module.exports = mongoose.model('Book', bookSchema);

//Get Books 
module.exports.getBooks = function(callback, limit){

    Book.find(callback).limit(limit);
}

//Get Books by id
module.exports.getBookById = function(id,callback){
    
        Book.findById(id,callback);
    }

    //Add new book
module.exports.addBook = function(book,callback){
    
        Book.create(book,callback);
    }