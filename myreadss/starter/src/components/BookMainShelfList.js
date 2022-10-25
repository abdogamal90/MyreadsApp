import BookMainShelf from "./BookMainShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useMemo } from "react";

const BookMainShelfList = ({ books, onShelfChange }) => {

  const currentlyReading = useMemo(() => { return books.filter(book => book.shelf === "currentlyReading") }, [books])
  const wantToRead = useMemo(() => { return books.filter(book => book.shelf === "wantToRead") }, [books])
  const read = useMemo(() => { return books.filter(book => book.shelf === "read") }, [books])

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookMainShelf title="Currently Reading" books={currentlyReading} onShelfChange={onShelfChange} />
          <BookMainShelf title="Want to Read" books={wantToRead} onShelfChange={onShelfChange} />
          <BookMainShelf title="Read" books={read} onShelfChange={onShelfChange} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          Add a book
        </Link>
      </div>
    </div>
  )
}

BookMainShelfList.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookMainShelfList