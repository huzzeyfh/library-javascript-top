//array of books
const myLibrary = [];
const myShelf = document.createElement("div");
myShelf.id = "shelf";
document.body.appendChild(myShelf);

//book constructor
function Book(title, author, page, read) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
  this.id = crypto.randomUUID();
}

//book prototype to toggle read status
Book.prototype.toggleRead = function () {
  this.read = this.read == true ? false : true;
  renderLibrary();
};

//add a book to myLibrary
function addBookToLibrary(title, author, page, read) {
  const book = new Book(title, author, page, read);
  myLibrary.push(book);
}

//render added book
function renderLibrary() {
  while (myShelf.firstChild) {
    myShelf.removeChild(myShelf.firstChild);
  }

  myLibrary.forEach((book) => {
    const divShelf = document.createElement("div");
    const infoShelf = document.createElement("p");
    const readStatus = book.read ? "Read" : "Not Read";
    infoShelf.textContent = `${book.title} by ${book.author}, ${book.page} pages, ${readStatus}`;

    //add toggleRead button
    const readBtn = document.createElement("button");
    readBtn.textContent = "Read";
    readBtn.id = book.id;
    readBtn.addEventListener("click", (event) => {
      book.toggleRead();
    });

    //add remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.id = book.id;
    removeBtn.addEventListener("click", (event) => {
      const bookId = event.target.dataset.id;
      const findBookId = myLibrary.findIndex((book) => book.id === bookId);
      myLibrary.splice(findBookId, 1);
      renderLibrary();
    });

    divShelf.append(infoShelf, readBtn, removeBtn);
    myShelf.appendChild(divShelf);
  });
}

//book form
const dialogForm = document.getElementById("dialogForm");

document.getElementById("bookForm").addEventListener("submit", (event) => {
  //prevent the default browser page reload on submit
  event.preventDefault();

  //track variables and input elements
  const inputTitle = document.getElementById("title");
  const inputAuthor = document.getElementById("author");
  const inputPage = document.getElementById("page");
  const checkRead = document.getElementById("read");

  //assign the input to the function
  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPage.value,
    checkRead.checked,
  );

  //render it to the library
  renderLibrary();

  //reset form
  bookForm.reset();

  //close dialogForm after submitting
  dialogForm.close();
});
