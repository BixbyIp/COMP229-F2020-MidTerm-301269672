                                                                                                                                                                                                                                                                                                                                                                        // modules required for routing
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')

// define the book model
let book = require('../models/books')

/* GET books List page. READ */
router.get('/', (req, res, next) => { 
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err)
    }
    else {
      res.render('books/index', {title: 'Books', books: books})
    }
  })
})

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details',{
      title:'Add Book',
      books: ''
    })
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // instantiate an object of the book model (excluding the _id property)
    let newBook = book({
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
    })
    // pass this object to the create method of the book model to add a new book to the database
    book.create(newBook, (err, Book) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/books') // redirect the user back to the BookList page ('/books') when the insertion is completed
        }
    })
})

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // declare an id variable and set its value to the id property of the request object
    let id = req.params.id;

    // pass the id to the book model’s findById method to render the book details view
    book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // set an appropriate title property value and set the books property to the book that was returned from the database
            res.render('books/details', {
                title: 'Edit Book',
                books: bookToEdit
            });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // declare an id variable and set its value to the id property of the request object
    let id = req.params.id

    // instantiate an object of the book model (including the _id property)
    let updatedBook = book({
        "_id": id,
        "Title": req.body.Title,
        "Description": req.body.Description,
        "Price": req.body.Price,
        "Author": req.body.Author,
        "Genre": req.body.Genre
    });
    // pass this object to the update method of the book model to edit an existing book in the database
    book.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/books') // redirect the user back to the BookList page ('/books') when the update is completed
        }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // declare an id variable and set its value to the id property of the request object
    let id = req.params.id

    // pass the id to the book model’s remove method
    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/books') // redirect the user back to the BookList page ('/books') when the removal is completed
        }
    });
});


module.exports = router;
