import React from 'react'
import { Link } from 'react-router-dom'



class SearchPage extends React.Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    render() {

        const { query } = this.state
        console.log(query)

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
                        
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage