import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../../components/BookShelf'
class MainPage extends React.Component {

    shelves = [
        {
            id: 1,
            shelfName: 'Currently Reading'
        },
        {
            id: 2,
            shelfName: 'Want To Read'
        },
        {
            id: 3,
            shelfName: 'Read'
        }
    ]

    render() {

        console.log('PROPS', this.props.books)


        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.shelves.map((shelf) => (
                            <div key={shelf.id}>
                                {shelf.shelfName === 'Currently Reading' && (
                                    <BookShelf key={shelf.id} updateState={this.props.updateState} shelf={shelf.shelfName} books={this.props.books.filter((book) => book.shelf === 'currentlyReading')} />
                                )}
                                {shelf.shelfName === 'Want To Read' && (
                                    <BookShelf key={shelf.id} shelf={shelf.shelfName} books={this.props.books.filter((book) => book.shelf === 'wantToRead')}/>
                                )}
                                {shelf.shelfName === 'Read' && (
                                    <BookShelf key={shelf.id} shelf={shelf.shelfName} books={this.props.books.filter((book) => book.shelf === 'read')}/>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/search'
                        className='add-contact'>
                        <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MainPage