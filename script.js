const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  return book;
}

const booksContainer = document.querySelector(".books");

function renderLibrary() {
  booksContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;

    booksContainer.appendChild(bookDiv);
  });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);

renderLibrary();

console.log(myLibrary);

// addBook variables
const addBook = document.querySelector("#add-book");
const theDialog = document.querySelector("#add-book-dialog");
const outputCard = document.querySelector("output");
const submit = document.querySelector("#submit-btn");

// dialog variables
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

addBook.addEventListener("click", () => {
  theDialog.showModal();
  submit.addEventListener("click", (event) => {
    event.preventDefault();

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);
    renderLibrary();

    theDialog.close();
  });
});

theDialog.addEventListener("close", () => {});
