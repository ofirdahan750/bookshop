'use strict'

function onInit() {
    renderBooks()
    renderVendors();
}

function renderVendors() {
    var vendors = getVendors();
    var strHTMLs = vendors.map(function(vendor) {
        return `<option>${vendor}</option>`
    })
    document.querySelector('.vendor-list').innerHTML = strHTMLs.join('')
}

function onSetLang(lang) {
    setLang(lang);
    doTrans();
    renderBooks();
}

function renderBooks() {
    var books = getBooks()
    var fixedFirst = `<table><tr><th>Id</th><th>Title</th><th>Price</th><th colspan="3">Action</th></tr>`
    var strHtmls = books.map(function(book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.vendor}</td>
        <td>${book.price}$</td>
        <td ><button class="btn btn-primary"type="button" onclick="onReadbook('${book.id}')">Read</button></td>
        <td><button class="btn btn-success" type="button" onclick="onUpdateBook('${book.id}')">Update</button></td>
        <td><button class="btn btn-danger" type="button" onclick="onDeletebook('${book.id}')">Delete</button></td>
        <tr>
        `
    })
    document.querySelector('.books-container').innerHTML = fixedFirst + strHtmls.join('') + `</table>`
}

function onDeletebook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    var vendor = document.querySelector('.vendor-list').value;
    addBook(vendor)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = +prompt('Please fill new price');
    if (!newPrice) {
        alert('invalid price! Please try agian with number only')
        return false
    }
    if (newPrice < 0) {
        alert(`Price can't be smaller than 0`)
        return false
    }
    updateBook(bookId, newPrice);
    renderBooks();
}

function onUpdateRate(upAreDown, bookId) {
    changeRate(upAreDown, bookId);
    onReadbook(bookId)
    renderBooks();
}

function onReadbook(bookId) {
    var up = '+'
    var down = '-'
    var book = getBookById(bookId)
    var elModal = document.querySelector('.myModal')
    elModal.querySelector('h5').innerText = `${book.vendor} `
    elModal.querySelector('h6').innerHTML = `Book Rating: ${book.rate}<br> Change Rating: <button onclick="onUpdateRate('${down}','${book.id}')">-</button> ${book.rate} <button onclick="onUpdateRate('${up}','${book.id}')">+</button>`
    elModal.querySelector('h7').innerText = ` Price: ${book.price}$ `
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.the-img').innerHTML = `<img src = "img/${book.vendor}.png" alt="book photo of:${book.vendor}">`
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.myModal').hidden = true
}


function onNextPage() {
    nextPage();
    renderBooks();
}

function onAddNewBook(ev) {
    ev.preventDefault();
    var elBookTxt = document.querySelector('input[name=bookName]');
    var bookName = elBookTxt.value;
    if (bookName.length === 0) return false
    var elTodoPrice = document.querySelector('input[name=bookprice]');
    var price = +elTodoPrice.value;
    if (price === 0 || !price) return false
    addBook(bookName, price)
    elBookTxt.vendor = ''
    renderBooks();
}