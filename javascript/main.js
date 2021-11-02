const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector('#book-form');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#read');
const toggleFormButton = document.querySelector('#toggle-form');
const submitBook = document.querySelector('#submit-book');

let removeButtons = document.querySelectorAll('.remove-button');
let readButtons = document.querySelectorAll('.read-button');
let myLibrary = [];

loadFromLocalStorage();
loadDefaultBooks();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = '';
  this.info = function() {
    readStatus = (this.read) ? "read" : "not read yet";
    return title + ' by ' + author + ', ' + pages + ' pages, ' + readStatus;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createReadButton(book) {
  let readButton = document.createElement('button');
  readButton.innerText = 'Read';
  readButton.className = 'read-button';
  readButton.dataset.index = book.index;
  return readButton;
}

function createRemoveButton(book) {
  let removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.className = 'remove-button';
  removeButton.dataset.index = book.index;
  return removeButton;
}

function addBookToDisplay(book) {
  let bookItem = document.createElement('li');
  bookItem.innerText = book.info();
  bookItem.appendChild(createReadButton(book));
  bookItem.appendChild(createRemoveButton(book));
  bookItem.dataset.index = book.index;
  bookList.appendChild(bookItem);
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

function toggleRead(book) {
  book.read = !book.read;
}

function setReadButtons() {
  readButtons = document.querySelectorAll('.read-button');
  readButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      let index = e.target.dataset.index;
      toggleRead(myLibrary[index]);
      updateBookDisplay(myLibrary);
    });
  });
}

function setRemoveButtons() {
  removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      let index = e.target.dataset.index;
      myLibrary.splice(index, 1);
      updateBookDisplay(myLibrary);
    });
  });
}

function saveToLocalStorage(books) {
  localStorage.setItem('myLibrary', JSON.stringify(books));
}

function loadFromLocalStorage() {
  let loadedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  loadedLibrary.forEach(parsedBook => {
    let book = new Book(parsedBook.title, parsedBook.author, parsedBook.pages, parsedBook.read);
    addBookToLibrary(book);
  });
}

function loadDefaultBooks() {
  if(myLibrary.length === 0) {
    let theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
    let theAdventuresOfTomSawyer = new Book('The Adventures of Tom Sawyer', 'Mark Twain', 200, true);
    let theFellowshipOfTheRing = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 645, false)
    addBookToLibrary(theHobbit);
    addBookToLibrary(theAdventuresOfTomSawyer);
    addBookToLibrary(theFellowshipOfTheRing);
  }
}

function updateBookDisplay(books) {
  bookList.innerHTML = '';
  books.forEach(book => {
    book.index = myLibrary.indexOf(book);
    addBookToDisplay(book);
  });
  setReadButtons();
  setRemoveButtons();
  saveToLocalStorage(books);
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

updateBookDisplay(myLibrary);
