import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState ,useEffect} from 'react';

function App() {

  const [books,setBooks] = useState([]);
  const [bookId,setBookId] = useState();
  useEffect(()=>{
    axios.get('http://127.0.0.1:3000/books')
    .then(result=>setBooks(result.data))
    .catch(err=>console.log(err))
  },[books])

  const handleDelete=(id)=>{
    axios.delete('http://127.0.0.1:3000/books/'+id)
    .then(res=>{console.log(res)})
    .catch(err=>console.log(err))
  }
  return ( 
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50  bg-white rounded p-3">
      <h3>Search by Id:</h3>
      <input type="text" value ={bookId} placeholder='Enter book id' onChange={(e)=>setBookId(e.target.value)}></input>
      <Link to={`/getBook/${bookId}`} className="btn btn-secondary">GetBook</Link>
      <hr></hr>
      <h3>All Books</h3>
      <Link to="/create" className="btn btn-primary">Add Book</Link>
      <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book)=>{
                return <tr>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publication_year}</td>
                  <td>
                  <Link to={`/update/${book.id}`} className="btn btn-success">Update</Link>

                    
                  <button className="btn btn-danger" onClick={(e)=>handleDelete(book.id)}>Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;