import React from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from 'axios';
function GetBook() {
  const {id} = useParams();
  const [title,setTitle] = useState()
  const [author,setAuthor] = useState()
  const [genre,setGenre] = useState()
  const [yop,setYOP] = useState()
  const [book,setBook] = useState(null);
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://127.0.0.1:3000/books/'+id)
    .then(result=>{console.log(result);
      (result?setBook(result):setBook(null));
    setTitle(result.data.title);
    setAuthor(result.data.author);
    setGenre(result.data.genre);
    setYOP(result.data.publication_year)
  })
    .catch(err=>console.log(err))
  },[])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <>
      {book ? (
          <div className='w-50 bg-white rounded p-3'>
            <h2>Book #{id}</h2>
            <div className="mb-2">
              <label>Title: {title}</label>
            </div>
            <div className="mb-2">
              <label>Author: {author}</label>
            </div>
            <div className="mb-2">
              <label>Genre: {genre}</label>
            </div>
            <div className="mb-2">
              <label>Publication Year: {yop}</label>
            </div>
          </div>
        ) : (
          <div className='w-50 bg-warning text-white rounded p-3'>
          <h2>No Book Found with ID #{id}</h2>
          </div>
        )}
      </>
    </div>
  );
}

export default GetBook;