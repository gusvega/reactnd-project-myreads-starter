import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'



class SearchPage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    componentDidMount() {
        console.log('ALL BOOKS', this.props.books)
    }

    state = {
        query: '',
        searchedBooks: []
    }

    updateQuery = (query) => {
        console.log(query)

        BooksAPI.search(query)
            .then((searchedBooks) => {
                this.setState(() => ({
                    query: query.trim(),
                    searchedBooks: searchedBooks
                }))
            })
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {

        const { query, searchedBooks } = this.state

        console.log('SEARCHED BOOKS', this.state.searchedBooks)

        const showingBooks = query === ''
            ? searchedBooks
            : searchedBooks.filter((c) => (
                c.title.toLowerCase().includes(query.toLowerCase())
            ))

        // console.log(showingBooks)

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
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <Book key={book.id} bookDetails={book} ></Book>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage