import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../components/BookShelf'
class MainPage extends React.Component {

    shelves = [
        {
            id: 'currentlyReading',
            shelfName: 'Currently Reading'
        },
        {
            id: 'wantToRead',
            shelfName: 'Want To Read'
        },
        {
            id: 'read',
            shelfName: 'Read'
        }
    ]

    render() {


        const { books, updateState } = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.shelves.map((shelf) => (
                            <div key={shelf.id}>
                                <BookShelf key={shelf.id} updateState={updateState} shelf={shelf.shelfName} books={books.filter((book) => book.shelf === shelf.id)} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        className='add-contact'>
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MainPage