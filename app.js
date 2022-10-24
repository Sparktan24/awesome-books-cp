class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookList(book));
  }

  static addBookList(book) {
    const bookList = document.getElementById('book-list');

    const content = document.createElement('div');
    content.innerHTML = `
    <div>${book.title}</div>
    <div>${book.author}</div>
    <button class="delete">Remove</button>
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

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  UI.addBookList(book);

  Store.addBook(book);

  console.log(book);

  UI.clearFields();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});
