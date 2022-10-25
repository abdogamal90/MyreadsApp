import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookMain from "./BookMain";
import { useState, useMemo, useCallback } from "react";
import * as BooksAPI from "./BooksAPI";
import debounce from 'lodash.debounce';

const BookMainSearch = ({ books, onChangeShelf }) => {

    const [query, setQuery] = useState("")
    const [queryResults, setQueryResults] = useState([])

    const mergeSearchResultAndShelfs = (queryResultBooks, shelfBooks) => {
        return queryResultBooks.map((queryResultBook) => {
            const bookOnShelf = shelfBooks.find((bookOnShelf) => bookOnShelf.id === queryResultBook.id)
            if (bookOnShelf) {
                return bookOnShelf
            } else {
                queryResultBook.shelf = "none"
                return queryResultBook
            }
        })
    }

    const search = useCallback((query) => {
        try {
            BooksAPI.search(query, 10).then((res) => {
                if (Array.isArray(res)) {
                    const enhancedSearchResult = mergeSearchResultAndShelfs(res, books)
                    setQueryResults(enhancedSearchResult);
                } else {
                    setQueryResults([])
                }
            })
        } catch (error) {
            console.error("Request failed", error)
            setQueryResults([])
        }
    }, [books])

    const debouncedSearch = useMemo(() => debounce(search, 500), [search]);

    const onSearchChangedTerm = (event) => {
        event.preventDefault()
        const query = event.target.value
        setQuery(query)
        if (query.length > 0) {
            debouncedSearch(query)
        } else {
            setQueryResults([])
        }
    };

    const onSearchShelfChange = (book, shelf) => {
        setQueryResults(queryResults.map((b) => {
            if (b.id === book.id) {
                return {
                    ...b,
                    shelf: shelf
                }
            }
            return b
        }));
        onChangeShelf(book, shelf)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onInput={onSearchChangedTerm}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {query.length > 0 &&
                        queryResults.map((book) => {
                            return (
                                <li key={book.id}>
                                    <BookMain book={book} onChangeShelf={onSearchShelfChange} />
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

BookMainSearch.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default BookMainSearch