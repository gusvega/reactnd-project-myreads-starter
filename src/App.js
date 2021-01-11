import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import {Route} from 'react-router-dom'
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

  render() {
    return (
      <div className="app">

        <Route exact path='/'>
          <MainPage state={this.state}></MainPage>
          </Route> 
        
        <Route exact path='/search' >
          <SearchPage books={this.state.books}></SearchPage>
        </Route>

      </div>
    )
  }
}

export default BooksApp
