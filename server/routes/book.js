const express = require('express');
const router = express();
const cors  = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbBook = require('../models/dbBook');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded( {extended: false} ));

router.get('/index', (request, response) => {
    const bookDB = dbBook.create();

    bookDB.getAllBook()
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.post('/create', (request, response) => {
    const {name, writer, year, pages_number, available} = request.body;

    // console.log(name, writer, year, pages_number, available);

    const bookDB = dbBook.create();

    bookDB.insertNewBook(name, writer, year, pages_number, available)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.delete('/delete/:id', (request, response) => {
    const {id} = request.params;

    const bookDB = dbBook.create();

    bookDB.deleteBookById(id)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.patch('/update', (request, response) => {
    const {id, name, writer, year, pages_number, available} = request.body;
    
    const bookDB = dbBook.create();

    bookDB.updateBookById(id, name, writer, year, pages_number, available)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.get('/search/:name', (request, response) => {
    const {name} = request.params;

    const bookDB = dbBook.create();

    bookDB.searchBookByName(name)
        .then(data => response.json(data))
        .catch(err => console.log(err));
});

router.get('/index-rent', (request, response) => {
    const bookDB = dbBook.create();

    bookDB.getAllRent()
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.post('/rent', (request, response) => {
    const {book_id, member_id, renting_date} = request.body;
    
    const bookDB = dbBook.create();

    bookDB.rentBook(book_id, member_id, renting_date)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.delete('/returnBook/:rent_id/:book_id', (request, response) => {//2 parametra?
    const {rent_id, book_id} = request.params;

    const bookDB = dbBook.create();

    bookDB.returnBook(rent_id, book_id)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

module.exports = router;