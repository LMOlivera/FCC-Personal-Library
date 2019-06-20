/*
*Complete the API routing below
*/

'use strict';

var expect = require('chai').expect;
var Book = require('../models/Book.js');

module.exports = function (app) {

  app.route('/api/books')
    //4 - Retrieve books with titles and comment count.
    .get(function (req, res){
      let bookList = [];    
      Book.find({},(err, data)=>{
        data.forEach((book)=>{
          let b = {};
          b._id = book._id;
          b.title = book.title;
          b.commentcount = book.comments.length;
          bookList.push(b);
        });        
        err ? res.json({error: "There was an error when trying to retrieve the books list."}) : res.json(bookList);
      });
    })
  
    //3 - Post a title
    .post(function (req, res){
      var title = req.body.title;
      Book.findOne({title: title},
                   (err, data)=>{
        if(err) {
          res.json({error: "Could connect to database."});
        }else{
          if(data==undefined||data==null){
            var b = new Book({
              title: title
            })
            b.save((err, data=>{
              if(err){
                res.json({error: "Could not save book in the database."});
              }else{
                //response will contain new book object including atleast _id and title
                res.json({_id: data._id, title: data.title});
              }
            }))
          }else{
            res.json({error: "The title already exists in the database."});
          }
        }
      });
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });


  //5 - Get book by id
  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      Book.findOne({_id: bookid}, (err, data)=>{
        if(err){
          res.json({error: "The book does not exist"});
        }else{
          if(bookid==undefined || bookid==null){
            res.json({error: "You did not provide a Book's id"});
          }else{
            res.json(data);
          }
        }
      });
    })
    
    //6 - Post a comment to book
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      Book.findOne({_id: bookid}, (err, data)=>{
        if(err){
          res.json({error: "There was an error when trying to look for the book"});
        }else{
          data.comments.push(comment);
          Book.findOneAndUpdate({_id: bookid}, {comments: data.comments}, {useNew: true}, (err, data)=>{
            if(err){
              res.json({error: "There was an error trying to save your comment."});
            }else{
              res.json(data);
            }
          });
        }
      })
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      Book.findOneAndDelete({_id: bookid}, (err, data)=>{
        if(err){
          res.json({error: "There was an error when trying to delete book"});
        }else{
          console.log(data);
          if(bookid==undefined || bookid==null){
            res.json({error: "You did not provide a Book's id"});
          }else{
            if(data==undefined){
              res.json({error: "The book you are trying to delete does not exist"});
            }else{
              res.json({message: "Successful"});
            }            
          }
        }
      });
    });
  
};
