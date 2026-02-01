class Book {
  id = crypto.randomUUID();

  constructor(author, title, numberOfPages, isRead = false) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
  }

  toggleStatus() {
    this.isRead = !this.isRead;
  }
}

const myLibrary = [
  new Book('J.K. Rowling', 'Harry Potter and the Sorcerer’s Stone', 309, true),
  new Book('Harper Lee', 'To Kill a Mockingbird', 281, false),
  new Book('Agatha Christie', 'Murder on the Orient Express', 256, false),
  new Book('F. Scott Fitzgerald', 'The Great Gatsby', 180, true),
  new Book('J.R.R. Tolkien', 'The Hobbit', 310, false),
];

function addBookToLibrary(author, title, numberOfPages, isRead) {
  myLibrary.push(new Book(author, title, numberOfPages, isRead));
}

function deleteBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
  }
}

function toggleBookStatus(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    myLibrary[bookIndex].toggleStatus();
  }
}

function displayBooks() {
  bookListEl.innerHTML = myLibrary
    .map(
      (book) => `
        <div class="book-card" data-book-id="${book.id}">
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.numberOfPages}</p>
          <p>Status: ${book.isRead ? 'Read' : 'Not read'}</p>
          
          <div class="card-actions">
            <button data-action="toggle-status">Change Status</button>
            <button data-action="delete">Delete</button>
          </div>
        </div>
      `,
    )
    .join('');
}

/* DOM Elements */
const bookListEl = document.querySelector('.book-list');
const addBookBtn = document.getElementById('addBookBtn');
const addBookForm = document.getElementById('addBookForm');
const addBookDialog = document.getElementById('addBookDialog');
const cancelBtn = document.getElementById('cancelBtn');

/* Event Listeners */
addBookBtn.addEventListener('click', () => {
  addBookDialog.showModal();
});

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const numberOfPages = Number(document.getElementById('numberOfPages').value);
  const isRead = document.getElementById('isRead').checked;

  if (!author || !title || numberOfPages <= 0) return;

  addBookToLibrary(author, title, numberOfPages, isRead);
  displayBooks();

  addBookForm.reset();
  addBookDialog.close();
});

cancelBtn.addEventListener('click', () => {
  addBookForm.reset();
  addBookDialog.close();
});

bookListEl.addEventListener('click', (e) => {
  if (!e.target.matches('button[data-action]')) return;

  const bookCard = e.target.closest('.book-card');

  if (!bookCard) return;

  const bookId = bookCard.dataset.bookId;

  if (e.target.dataset.action === 'delete') {
    deleteBook(bookId);
  } else if (e.target.dataset.action === 'toggle-status') {
    toggleBookStatus(bookId);
  }

  displayBooks();
});

/* Initial Render */
displayBooks();
