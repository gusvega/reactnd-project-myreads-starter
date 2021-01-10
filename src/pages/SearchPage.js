import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import PropTypes from 'prop-types'




class SearchPage extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeState: PropTypes.func.isRequired
    }

    componentDidMount(){
        console.log('ALL BOOKS', this.props.books)
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {

        const { query } = this.state
        const { books, onChangeState } = this.props

        console.log(query)

        const showingBooks = query === ''
        ? books
        : books.filter((c) => (
            c.title.toLowerCase().includes(query.toLowerCase())
        ))

        console.log(showingBooks)

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
                        <Book key={book.id} bookDetails={book} onChangeState={onChangeState}></Book>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage