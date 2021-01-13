import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'


class SearchPage extends React.Component {

    state = {
        query: '',
        books: []
    }


    updateQuery = (query) => {
        console.log(query)

        if(query){
            BooksAPI.search(query)
            .then((searchedBooks) => {

                this.setState(() => ({
                    query: query.trim(),
                    books: searchedBooks
                }))

                if(this.state.books.length > 0){
                    console.log('SEARCHED BOOKS', searchedBooks)
                    searchedBooks = query === ''
                    ? searchedBooks
                    : searchedBooks.filter((c) => {
                        return c.title.toLowerCase().includes(query.toLowerCase())
                    })
                    console.log('BOOKS FROM STATE', this.state.books)
                }
                
 
                console.log(searchedBooks)
            })
        }else{
            this.setState({
                query: '',
                books: [] 
            })
            console.log('ERROR')
        }
        
    }


    render() {

        const { query, books } = this.state
        const { updateState } = this.props

        return (
            <div>
                <div className="search-books-bar">
                    <Link
                        className='close-search-page'
                        to='/'>
                        Close
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            id='myInput'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => {
                                this.updateQuery(event.target.value)
                            }}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { books.length > 0 ?
                            books.map((book) => (
                            <div key={book.id} className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => {
                                            this.shelf = event.target.value
                                            BooksAPI.update(book.id, this.shelf)
                                            updateState(books)
                                        }}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading" >Currently Reading</option>
                                            <option value="wantToRead" >Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        )) : <p>Nothing here yet</p>}
                    </ol>
                </div>
            </div>
        )
    }
}
// {/* <Book key={book.id} bookDetails={book} updateState={this.props.updateState}></Book> */}


export default SearchPage

