import PropTypes from "prop-types";

const BookMain = ({ book, onShelfChange }) => {

    const onBookShelfChange = (event) => {
        onShelfChange(book, event.target.value)
    }

    return (
        <div className="book">
            <div className="book-top">
                {book.imageLinks?.thumbnail
                    ? <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                'url("' + book.imageLinks.thumbnail + '")',
                        }}
                    ></div>
                    : <div>
                        <p>no thumbnail</p>
                    </div>
                }
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={onBookShelfChange}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

BookMain.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
};

export default BookMain