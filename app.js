/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, id) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Store {
  constructor() {
    this.count = this.getBooks().length + 1;
  }

  getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  addBook(book) {
    const newBook = {
      id: this.count,
      title: book.title,
      author: book.author,
    };

    const books = this.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    this.count += 1;
  }

  removeBook(id) {
    const books = this.getBooks();
    const filteredBooks = books.filter((book) => {
      return book.id !== id;
    });
    localStorage.setItem('books', JSON.stringify(filteredBooks));
  }
}

class UI {
  static displayBooks() {
    const books = store.getBooks();
    books.forEach((book) => UI.addBookList(book));
  }

  static addBookList(book) {
    const bookList = document.getElementById('book-list');

    const content = document.createElement('div');
    content.innerHTML = `
    <div>${book.title}</div>
    <div>${book.author}</div>
    <button id="book-num-${book.id}"class="delete">Remove</button>
    <hr>
    `;

    bookList.appendChild(content);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Creating new Store
const store = new Store();
console.log(store.count);

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = store.count;

  const book = new Book(title, author, id);

  UI.addBookList(book);

  store.addBook(book);

  console.log(book);

  UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const btnID = e.target.id;
  const arrValues = btnID.split('-');
  const idString = arrValues[arrValues.length - 1];
  const id = parseInt(idString);
  // Remove book from store
  store.removeBook(id);
});
