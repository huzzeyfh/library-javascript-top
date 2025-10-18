const myLibrary = [];

const booksContainer = document.querySelector(".books");

// addBook variables
const addBook = document.querySelector("#add-book");
const theDialog = document.querySelector("#add-book-dialog");
const outputCard = document.querySelector("output");
const submit = document.querySelector("#submit-btn");

// dialog variables
const form = document.querySelector("form");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookRead = document.querySelector("#book-read");

const pages = Number(bookPages.value);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};


//functions

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function renderLibrary() {
  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const info = document.createElement("p");
    info.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;

    // Show read status
    const status = document.createElement("p");
    status.textContent = book.read ? "Status: Read" : "Status: Not read";

    // Create toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    toggleBtn.dataset.id = book.id;

    toggleBtn.addEventListener("click", () => {
      book.toggleRead(); // use our prototype function
      renderLibrary(); // refresh the view so text updates
      console.log(myLibrary);
    });

    // Remove button (your existing one)
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.id = book.id;
    removeBtn.addEventListener("click", (e) => {
      const objId = e.target.dataset.id;
      const findBook = myLibrary.findIndex((obj) => obj.id === objId);
      if (findBook !== -1) {
        myLibrary.splice(findBook, 1);
        renderLibrary();
        console.log(myLibrary);
      }
    });

    // Add everything into the bookDiv
    bookDiv.append(info, status, toggleBtn, removeBtn);
    booksContainer.appendChild(bookDiv);
  });
}


addBook.addEventListener("click", () => {
  theDialog.showModal();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();

  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
  renderLibrary();
  form.reset();
  console.log(myLibrary);

  theDialog.close();
});

theDialog.addEventListener("close", () => {});
