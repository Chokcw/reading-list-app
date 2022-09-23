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

Library.prototype.addBook = function(book) {
    this.books.push(book);
    console.log("Booked added.");
}

Library.prototype.displayBooks = function() {
    for (const book of this.books) {

        bookCard = createBookCard(book);
        bookList.appendChild(bookCard);
    }
}

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
var closeSpan = document.querySelector(".close"); // Get the <span> element that closes the modal

function addBook(e) {
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

addBookButton.addEventListener('click', addBook);
closeSpan.addEventListener('click', closeAddBookModalSpan);
window.addEventListener('click', closeAddBookModalWindow);





bookList = document.querySelector(".book-list");

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read");
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295, "Read");

const myLibrary = new Library();

myLibrary.addBook(theHobbit);
myLibrary.addBook(harryPotter);
myLibrary.displayBooks();