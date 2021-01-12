import React from 'react'
import * as BooksAPI from '../BooksAPI'




class Book extends React.Component {

    render() {
        const { bookDetails } = this.props
        console.log('BOOK DETAILS', this.props.bookDetails)
        console.log('BOOK SHELF', this.props.bookDetails.shelf)


        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookDetails.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={bookDetails.shelf} onChange={(event) => {
                                BooksAPI.update(bookDetails.id, event.target.value).then(() => {
                                    this.props.updateState(bookDetails)
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
                <div className="book-title">{bookDetails.title}</div>
                <div className="book-authors">{bookDetails.authors}</div>
            </div>
        )
    }
}

export default Book