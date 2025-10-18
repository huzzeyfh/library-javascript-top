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

const pages = Number(bookPages.value);

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

//functions

function addBookToLibrary(title, author, pages) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  return book;
}

function renderLibrary() {
  booksContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.id = `${book.id}`;

    bookDiv.appendChild(removeBtn);

    booksContainer.appendChild(bookDiv);

    removeBtn.addEventListener("click", (e) => {
      const objId = e.target.dataset.id
      const findBook = myLibrary.findIndex(obj => obj.id === objId);

      if (findBook !== -1) {
        myLibrary.splice(findBook, 1);
        bookDiv.remove();
      }
    });

  });
}

addBook.addEventListener("click", () => {
  theDialog.showModal();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();

  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);
  renderLibrary();
  form.reset();
  console.log(myLibrary);

  theDialog.close();
});

theDialog.addEventListener("close", () => {});
