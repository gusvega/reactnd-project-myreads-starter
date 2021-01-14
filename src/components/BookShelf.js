import React from 'react'
// import Book from './Book'
import * as BooksAPI from '../BooksAPI'


class BookShelf extends React.Component {

    shelf = ''

    render() {

        const { shelf, books, updateState} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <div key={book.id} className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => {
                                            this.shelf = event.target.value
                                            BooksAPI.update(book.id, this.shelf).then(() => {
                                                updateState(book, this.shelf)
                                            })
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
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

// {/* <Book key={book.id} bookDetails={book} books={books} updateState={this.props.updateState}></Book> */}

export default BookShelf