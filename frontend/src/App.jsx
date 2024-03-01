import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updatePublishYear, setUpdatePublishYear] = useState("");
  const [update, setUpdate] = useState(false);
  const [bookId, setBookId] = useState(null);

  const fetchData = () => {
    axios.get("http://localhost:3000/books").then((res) => {
      setBooks(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/books", {
        title: title,
        author: author,
        publishYear: publishYear,
      })
      .then((res) => {
        fetchData();
        setTitle("");
        setAuthor("");
        setPublishYear("");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/books/${id}`).then(() => {
      fetchData();
    });
  };

  const handleUpdate = (id) => {
    const book = books.find((book) => book._id === id);
    setUpdateTitle(book.title);
    setUpdateAuthor(book.author);
    setUpdatePublishYear(book.publishYear);
    setBookId(book._id);
    setUpdate(true);
  };

  const submitUpdate = () => {
    axios
      .put(`http://localhost:3000/books/${bookId}`, {
        title: updateTitle,
        author: updateAuthor,
        publishYear: updatePublishYear,
      })
      .then(() => {
        fetchData();
        setUpdate(false);
      });
  };

  return (
    <div className="container">
      <h1>Add Book</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Publish Year"
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <h1>All Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Year</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.publishYear}</td>
              <td>
                <button onClick={() => handleUpdate(item._id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {update && (
        <div className="update-form">
          <h1>Update Book</h1>
          <input
            type="text"
            placeholder="Title"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={updateAuthor}
            onChange={(e) => setUpdateAuthor(e.target.value)}
          />
          <input
            type="number"
            placeholder="Publish Year"
            value={updatePublishYear}
            onChange={(e) => setUpdatePublishYear(e.target.value)}
          />
          <button onClick={submitUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
