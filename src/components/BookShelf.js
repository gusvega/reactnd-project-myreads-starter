import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

    render() {

        const {shelf, books} = this.props
        console.log('BOOKS FROM PROPS', books)

        return (
            <div className="bookshelf">

                <h2 className="bookshelf-title">{shelf}</h2>


                <div className="bookshelf-books">

                    <ol className="books-grid">

                    {books.map((book) => (
                        <Book key={book.id} bookDetails={book} books={books}></Book>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf