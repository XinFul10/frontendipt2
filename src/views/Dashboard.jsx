import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Dashboard() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editAuthor, setEditAuthor] = useState("");
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        axiosClient.get("/api/books")
            .then(({data}) => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                setLoading(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosClient.post("/api/books", { title, author })
            .then(() => {
                setTitle("");
                setAuthor("");
                fetchBooks();
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleEdit = (book) => {
        setEditId(book.id);
        setEditTitle(book.title);
        setEditAuthor(book.author);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axiosClient.put(`/api/books/${editId}`, { title: editTitle, author: editAuthor })
            .then(() => {
                setEditId(null);
                setEditTitle("");
                setEditAuthor("");
                fetchBooks();
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this book?")) {
            axiosClient.delete(`/api/books/${id}`)
                .then(() => fetchBooks())
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div>
            <h1>Books</h1>
            <form onSubmit={handleSubmit} style={{marginBottom: '1rem'}}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <input
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
                <button type="submit">Add Book</button>
            </form>
            {errors && (
                <div style={{ color: 'red' }}>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>
                                    {editId === book.id ? (
                                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                                    ) : (
                                        book.title
                                    )}
                                </td>
                                <td>
                                    {editId === book.id ? (
                                        <input value={editAuthor} onChange={e => setEditAuthor(e.target.value)} />
                                    ) : (
                                        book.author
                                    )}
                                </td>
                                <td>
                                    {editId === book.id ? (
                                        <>
                                            <button onClick={handleUpdate}>Save</button>
                                            <button onClick={() => setEditId(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(book)}>Edit</button>
                                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}