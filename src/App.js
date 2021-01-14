import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './pages/MainPage'
import { Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import * as BooksAPI from './BooksAPI'




class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })

  }

  updateState = (book, shelf) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((c) => {
        if (c.id === book.id) {
          if (c.shelf) {
            c.shelf = shelf
          }
        }
        return c.shelf
      })
    }))
  }

  updateFromSearch = (newBook) => {
    this.setState((prevState) => ({
      books: prevState.books.concat([newBook])
    }))
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/'>
          <MainPage books={this.state.books} updateState={this.updateState}></MainPage>
        </Route>

        <Route exact path='/search' >
          <SearchPage booksFromMainState={this.state.books} updateFromSearch={this.updateFromSearch}></SearchPage>
        </Route>
      </div>
    )
  }
}

export default BooksApp
