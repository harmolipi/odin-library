const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector('#book-form');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const toggleFormButton = document.querySelector('#toggle-form');
const submitBook = document.querySelector('#submit-book');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    readStatus = (this.read) ? "read" : "not read yet";
    return title + ' by ' + author + ', ' + pages + ' pages, ' + readStatus;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function addBookToDisplay(book) {
  let bookItem = document.createElement('li');
  bookItem.textContent = book.info();
  bookList.appendChild(bookItem);
}

function updateBookDisplay(books) {
  bookList.innerHTML = '';
  books.forEach(book => {
    addBookToDisplay(book);
  });
}

function toggleForm() {
  bookForm.classList.toggle('hidden');
}

function clearForm() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = '';
  inputRead.checked = false;
}

toggleFormButton.addEventListener('click', toggleForm);

submitBook.addEventListener('click', function(e) {
  e.preventDefault();
  let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked);
  addBookToLibrary(newBook);
  updateBookDisplay(myLibrary);
  toggleForm();
  clearForm();
});

let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
let theAdventuresOfTomSawyer = new Book('The Adventures of Tom Sawyer', 'Mark Twain', 200, true);
let theFellowshipOfTheRing = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 645, false)

addBookToLibrary(theHobbit);
addBookToLibrary(theAdventuresOfTomSawyer);
addBookToLibrary(theFellowshipOfTheRing);

console.log(myLibrary);

myLibrary.forEach(addBookToDisplay);
