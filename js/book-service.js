'use strict'
const KEY = 'bookDB';
var gBooks;
var gVendors = ['Harry potter', '1984', 'Rich Dad Poor Dad', 'The Great Gatsby']
var gRate = 0

const PAGE_SIZE = 5;
var gPageIdx = 0;
var gLang = 'en';

_createBooks();

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
            return bookId === book.id
        })
        // if(bookIdx === -1) return;
    gBooks.splice(bookIdx, 1)


    _saveBooksToStorage();

}

function addBook(vendor, price) {
    var book = _createBook(vendor, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    })
    return book
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage();
}

function changeRate(upOrDown, bookId) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    })
    if (upOrDown === '+' && book.rate < 10) book.rate++
        if (upOrDown === '-' && book.rate > 0) book.rate--

            _saveBooksToStorage()
}

function getVendors() {
    return gVendors;
}



function _createBook(vendor, price) {
    return {
        id: makeId(),
        vendor: vendor,
        price: _getPriceForBook(price, ),
        desc: makeLorem(),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)

    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 21; i++) {
            var vendor = gVendors[getRandomIntInclusive(0, gVendors.length - 1)]
            books.push(_createBook(vendor))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function _getPriceForBook(price) {

    return (price) ? price : getRandomIntInclusive(1, 200)
}