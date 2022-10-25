import PropTypes from "prop-types";
import BookMain from "./BookMain";

const BookMainShelf = ({ title, books, onShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <BookMain book={book} onShelfChange={onShelfChange} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

BookMainShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookMainShelf