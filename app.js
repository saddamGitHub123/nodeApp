

var express = require('express');

var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const mysql = require('mysql');

app.use(bodyParser.json());

//include the file

Genre = require('./models/genre');

Book = require('./models/book');

//configure app

//use middleware

//define routes

//create connection  mysql

const mysqlDb = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
   // database : 'nodemysql'
    
});

//connect
mysqlDb.connect((err) =>{
    if(err){
        throw err;
    }
    console.log("Mysql connected");
});

//Create database

app.get('/createdb', (req, res) => {

    let sql = 'CREATE DATABASE nodemysql';
    mysqlDb.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created ....');
    });
});


//connect to mongoose

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/',function(req,res){
    debugger;
    res.send('PLEASE USE /api/books');
});

app.get('/api/genres',function(req,res){

    debugger;
    Genre.getGenres(function(err,genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });

});


//add genre
app.post('/api/genres',function(req,res){
    
    var genre = req.body;
            Genre.addGenre(genre,function(err,genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    
    });


    //update the genres table
app.put('/api/genres/:_id', function(req,res){
    
    var id = req.params._id;
    var genre = req.body;
    console.log(genre);
        Genre.updateGenre(id, genre, {}, function(err,genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    
    });

       //delete the genres table
app.delete('/api/genres/:_id', function(req,res){
    
    var id = req.params._id;
   
        Genre.deleteGenre(id, function(err,genre){
            if(err){
                throw err;
            }
            res.json(genre);
        });
    
    });


   //get all book from mongodb 
app.get('/api/books',function(req,res){
    
        Book.getBooks(function(err,books){
            if(err){
                throw err;
            }
            res.json(books);
        });
    
    });

//add the new book
    app.post('/api/books',function(req,res){
        
        var book = req.body;
        console.log(book);
            Book.addBook(book, function(err,book){
                if(err){
                    throw err;
                }
                res.json(book);
            });
        
        });





    app.get('/api/books/:id',function(req,res){
        
            Book.getBookById(req.params.id,function(err,book){
                if(err){
                    throw err;
                }
                res.json(book);
            });
        
        });

        //update the book object using id

        app.put('/api/books/:_id',function(req,res){

            var id = req.params._id;
            var book = req.body;
            console.log(book);

                Book.updateBook(id, book, {}, function(err,book){
                    if(err){
                        throw err;
                    }
                    res.json(book);
                });
            
            });

app.listen(3000,function(){

    console.log("Running on port 3000");
});

//var http = require('http');
/*http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    res.end('Hello World');

}).listen(1337,'127.0.0.1');
console.log("Server is running");*/