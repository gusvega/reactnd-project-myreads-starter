import React from 'react'

class Book extends React.Component {


    render() {

        const {bookDetails} = this.props
        console.log(bookDetails)

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookDetails.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
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