import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../../components/BookShelf'
import * as BooksAPI from '../../BooksAPI'



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

    state = {
        allBooks: [],
        currentlyReading: [
            {
                id: 'sss',
                name: 'sdasadsd',
                author: 'asdas',
                coverURL: 'asdsadsadsd'
            },
            {
                id: 'sss',
                name: 'sdasadsd',
                author: 'asdas',
                coverURL: 'asdsadsadsd'
            }
        ],
        wantToRead: [],
        read: [],
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((allBooks) => {
                this.setState(() => ({
                    allBooks
                }))
            })

    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.shelves.map((shelf) => (
                            <div>
                                {shelf.shelfName === 'Currently Reading' && (
                                    <BookShelf key={shelf.id} shelf={shelf.shelfName} books={this.state.currentlyReading} />
                                )}
                                {shelf.shelfName === 'Want To Read' && (
                                    <BookShelf key={shelf.id} shelf={shelf.shelfName} />
                                )}
                                {shelf.shelfName === 'Read' && (
                                    <BookShelf key={shelf.id} shelf={shelf.shelfName} />
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