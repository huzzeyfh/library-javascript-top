const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  return book;
}

const booksContainer = document.querySelector('.books');

function renderLibrary() {
    booksContainer.innerHTML = '';
    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages.`

        booksContainer.appendChild(bookDiv)
    })
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

renderLibrary();

console.log(myLibrary);
