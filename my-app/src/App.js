import { useState } from 'react';
import './App.css';

import Header from './components/Header';

import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import { getAllBooks, createBook, getAllTodos, createTodo } from './services/BookService';

import TodoTable from './components/TodoTable';
import TodoDisplayBoard from './components/TodoDisplayBoard';
import CreateTodo from './components/CreateTodo';

import Footer from './components/Footer';

function App() {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const [todoShelf, setTodoShelf] = useState({});
  const [todos, setTodos] = useState([]);
  const [numberOfTodos, setNumberTodos] = useState(0);

  const handleBookSubmit = () => {
    createBook(bookShelf)
      .then(() => {
        setNumberBooks(numberOfBooks + 1);
      });
  }

  const handleTodoSubmit = () => {
    createTodo(todoShelf)
      .then(() => {
        setNumberTodos(numberOfTodos + 1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const getAllTodo = () => {
    getAllTodos()
      .then(data => {
        setTodos(data);
        setNumberTodos(data.length);
      });
  }

  const handleOnChangeBookForm = (e) => {
    let inputData = bookShelf;
    if (e.target.name === 'book') {
      bookShelf.book = e.target.value;
    } else if (e.target.name === 'category') {
      bookShelf.category = e.target.value;
    } else if (e.target.name === 'author') {
      bookShelf.author = e.target.value;
    }
    setBookShelf(inputData);
  }

  const handleOnChangeTodoForm = (e) => {
    let inputData = todoShelf;
    if (e.target.name === 'todo') {
      todoShelf.todo = e.target.value;
    } else if (e.target.name === 'category') {
      todoShelf.category = e.target.value;
    } else if (e.target.name === 'isComplete') {
      todoShelf.isComplete = e.target.value;
    }
    setTodoShelf(inputData);
  }
  return (
    <div className="main-wrapper">
      <Header />
      <div className="main">
        <div className='book'>
          <CreateBook
            bookShelf={bookShelf}
            onChangeForm={handleOnChangeBookForm}
            handleSubmit={handleBookSubmit}
          />
          <DisplayBoard
            numberOfBooks={numberOfBooks}
            getAllBook={getAllBook}
          />
          <BookTable books={books} />
        </div>
        <div className='todo'>
          <CreateTodo
            todoShelf={todoShelf}
            onChangeForm={handleOnChangeTodoForm}
            handleSubmit={handleTodoSubmit}
          />
          <TodoDisplayBoard
            numberOfTodos={numberOfTodos}
            getAllTodo={getAllTodo}
          />

          <TodoTable
            todos={todos}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
