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

    title.textContent = book["title"]
    author.textContent = book["author"]
    pages.textContent = book["title"]
    read.textContent = book["read"]

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);

    return bookCard;
}

bookList = document.querySelector(".book-list");

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295, "read");

const myLibrary = new Library();

myLibrary.addBook(theHobbit);
myLibrary.addBook(harryPotter);
myLibrary.displayBooks();