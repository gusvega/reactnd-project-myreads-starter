import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'


class SearchPage extends React.Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {

        if (query) {
            this.setState({
                query: query
            })
            BooksAPI.search(query)
                .then((searchedBooks) => {
                    if (this.state.books.length > 0) {
                        searchedBooks = query === ''
                            ? searchedBooks
                            : searchedBooks.filter((c) => {
                                return c.title.toLowerCase().includes(query.toLowerCase())
                            })
                    }
                    this.setState(() => ({
                        books: searchedBooks
                    }))
                })
        } else {
            this.setState({
                query: '',
                books: []
            })
        }

        console.log('Update Query: ', this.state.books)
    }

    render() {

        const { query, books } = this.state
        const { updateMainState, booksFromMainState } = this.props

        let verifiedBooks = [];
        if (books.length > 0) {
            verifiedBooks = books.map(book => {
                booksFromMainState.forEach(bookOnShelf => {
                    // check wether book is already on shelf
                    if (book.id === bookOnShelf.id) {
                        // if yes get the shelf data from BooksOnShelf
                        book.shelf = bookOnShelf.shelf;
                    }
                });
                return book;
            });
        }

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
                        {verifiedBooks.length > 0 ?

                            verifiedBooks.map((book) => (

                                <div key={book.id} className="book">

                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})` }}></div>

                                        <div className="book-shelf-changer">
                                            <select
                                                value={!book.shelf ? 'none' : book.shelf}
                                                onChange={async (event) => {
                                                    this.shelf = event.target.value
                                                    await BooksAPI.update(book.id, this.shelf)
                                                    const newBook = await BooksAPI.get(book.id)
                                                    updateMainState(newBook)

                                                }}>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading" >Currently Reading</option>
                                                <option value="wantToRead" >Want to Read</option>
                                                <option value="read" >Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                                </div>
                            )) : <p>Nothing here</p>}
                    </ol>
                </div>
            </div>
        )
    }
}
// {/* <Book key={book.id} bookDetails={book} updateState={this.props.updateState}></Book> */}


export default SearchPage

