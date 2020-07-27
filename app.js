const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/bookDB", { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const bookSchema = {
    bookName: String,
    authorName: String,
    review: Number,
};
const Book = mongoose.model("Book", bookSchema);

//All Books CRD --start
app.route("/books")
.get(function(req,res){
    Book.find(function(err,books){
        if(books){
            const jsonBooks = JSON.stringify(books);
            res.send(jsonBooks);

        }else{
            res.send("No book found!");
        }
    });
})
.post(function(req,res){
    const newBook = Book({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        review: req.body.review,
    });
    newBook.save(function(err){
        if(!err){
            res.send("New Book Added Successfully");
        }else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    Book.deleteMany(function(err){
        if(!err){
            res.send("All Books Deleted Successfully");
        }else{
            res.send(err);
        }
    });
});
//All Books CRD --end

//Single Books RUD --start

app.route("/books/:bookSingleName")
.get(function(req,res){
    const book_name = req.params.bookSingleName;
    Book.findOne({bookName: book_name},function(err,book){
        if(book){
            const jsonBook = JSON.stringify(book);
            res.send(jsonBook);

        }else{
            res.send("No book found!");
        }
    });
})
.patch(function(req,res){
    const book_name = req.params.bookSingleName;
    Book.updateOne(
        {bookName: book_name},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Updated Successfully");
            }else{
                res.send(err);
            }
        }
    );
})
.put(function(req,res){
    const book_name = req.params.bookSingleName;
    Book.updateOne(
        {bookName: book_name},
        {$set: req.body},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("Updated Successfully");
            }else{
                res.send(err);
            }
        }
    );
})
.delete(function(req,res){
    Book.deleteOne(
        {bookName: req.params.bookSingleName},
        function(err){
            if(!err){
                res.send("Deleted a book Successfully");
            }else{
                res.send(err);
            }
        }
    );
});

//Single Books RUD --end

//server listerning port setting
app.listen(3000, function() {
  console.log("Server started on port 3000");
});