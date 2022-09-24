function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`
}

function Library() {
    this.books = [];
}

const myLibrary = new Library();

Library.prototype.addBook = function(book) {
    this.books.push(book);
    console.log("Booked added.");
}

Library.prototype.displayBooks = function() {
    bookList.textContent = ''
    for (const book of this.books) {
        bookCard = createBookCard(book);
        bookList.appendChild(bookCard);
    }
}

Library.prototype.removeBook = function(removeTitle) {
    removeBookPosition = 0
    for (const book of this.books) {
        if (book.title === removeTitle) {
            this.books.splice(removeBookPosition, 1);
        }
        else {
            removeBookPosition++;
        }
    }
}

Library.prototype.saveLocal = function() {
    localStorage.clear();
    localStorage.setItem('myLibrary', JSON.stringify(this.books))
}

Library.prototype.restoreLocal = function() {
    const books = JSON.parse(localStorage.getItem('myLibrary'))
    if (books) {
        this.books = books.map((book) => jsonToBook(book))
    } else {
        this.books = []
    }
}

function jsonToBook(book) {
    return new Book(book.title, book.author, book.pages, book.read)
}

bookList = document.querySelector(".book-list");
myLibrary.restoreLocal();
myLibrary.displayBooks();


function createBookCard(book) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const remove = document.createElement("div");

    bookCard.classList.add('book-card');
    title.classList.add('book-title');
    remove.classList.add('book-remove');
    read.classList.add('book-read-status');
   

    title.textContent = book["title"]
    author.textContent = book["author"]
    pages.textContent = `${book["pages"]} pages`
    read.textContent = book["read"];
    remove.textContent = "x";

    if (book["read"] === true) {
        read.textContent = "Read"
        read.classList.add('book-read-true');
    }
    else {
        read.textContent = "Not read"
        read.classList.add('book-read-false');
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(remove);

    return bookCard;
}


// Events to add book
const addBookButton = document.querySelector(".add-book");
var addBookModal = document.getElementById("addBookModal"); // Get the modal
// var closeSpan = document.querySelector(".close"); // Get the <span> element that closes the modal
const addBookForm = document.querySelector(".add-book-form");
addBookForm.library = myLibrary

const newBookTitle = document.querySelector("#new-book-title");
const newBookAuthor = document.querySelector("#new-book-author");
const newBookPages = document.querySelector("#new-book-pages");
const newBookRead = document.querySelector("#new-book-read");


function openAddBookModal(e) {
    // When the user adds book, open the modal
    addBookModal.style.display = "block";
}

function closeAddBookModalSpan(e) {
    // When the user clicks on <span> (x), close the modal
    addBookModal.style.display = "none";
}

function closeAddBookModalWindow(e) {
    // When the user clicks anywhere outside of the modal, close it
    if (e.target == addBookModal) {
        addBookModal.style.display = "none";
    }
}

function confirmAddBook(e) {
    var title = newBookTitle.value;
    var author = newBookAuthor.value;
    var pages = newBookPages.value;
    var read = newBookRead.checked

    newBook = new Book(title, author, pages, read);
    e.currentTarget.library.addBook(newBook);
    e.currentTarget.library.saveLocal();
}

addBookButton.addEventListener('click', openAddBookModal);
// closeSpan.addEventListener('click', closeAddBookModalSpan);
window.addEventListener('click', closeAddBookModalWindow);
addBookForm.addEventListener('submit', confirmAddBook);


// Events to remove book
const removeBookButtons = document.querySelectorAll(".book-remove");

function removeBook(e) {
    targetParent = e.currentTarget.parentElement;
    title = targetParent.querySelector(".book-title").textContent;

    e.currentTarget.library.removeBook(title);
    e.currentTarget.library.saveLocal();
    e.currentTarget.library.displayBooks();
}

removeBookButtons.forEach((removeBookButton) => {
    removeBookButton.addEventListener('click', removeBook);
    removeBookButton.library = myLibrary;
})






const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295, true);

// myLibrary.addBook(theHobbit);
// myLibrary.addBook(harryPotter);