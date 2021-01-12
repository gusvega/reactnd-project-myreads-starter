import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import { Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import * as BooksAPI from './BooksAPI'



const books = [];

class BooksApp extends React.Component {

  state = {
    books
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  updateState= (book, shelf) => {
    console.log('Update State Executed', book.shelf)

    this.setState((prevState) => ({
      contacts: prevState.books.filter((c) => {
        if(c.id === book.id){
          c.shelf = shelf
          console.log(c.shelf)
        }

        return c.shelf


      })
    }))
    
    console.log('Update State Executed', book.shelf)

  }
    
  render() {
    return (
      <div className="app">

        <Route exact path='/'>
          <MainPage books={this.state.books} updateState={this.updateState}></MainPage>
        </Route>

        <Route exact path='/search' >
          <SearchPage state={this.state}></SearchPage>
        </Route>



      </div>
    )
  }
}

export default BooksApp
