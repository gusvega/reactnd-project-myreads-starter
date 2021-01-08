import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import {Route} from 'react-router-dom'
import SearchPage from './pages/SearchPage'




class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render= {() =>(
          <MainPage></MainPage>
        )}/>
        
        <Route exact path='/search' render= {() =>(
          <SearchPage></SearchPage>
        )}/>

      </div>
    )
  }
}

export default BooksApp
