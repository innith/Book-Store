import React from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from 'axios';
function UpdateBooks() {
  const {id} = useParams();
  const [title,setTitle] = useState()
  const [author,setAuthor] = useState()
  const [genre,setGenre] = useState()
  const [yop,setYOP] = useState()
  const navigate = useNavigate()

  const Update=(e)=>{
    e.preventDefault();
    axios.put("http://127.0.0.1:3000/books/"+id,{ 
    "title":title,
    "author":author,
    "genre":genre,
    "publication_year":yop})
    .then(result=>{console.log(result)
      navigate('/')
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:3000/books/'+id)
    .then(result=>{console.log(result);
    setTitle(result.data.title);
    setAuthor(result.data.author);
    setGenre(result.data.genre);
    setYOP(result.data.publication_year)
  
  })
    .catch(err=>console.log(err))
  },[])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form>
          <h2>Update Book</h2>
          <div className='mb-2'>
        <label htmlFor="">Title</label>
        <input type="text" placeholder="Enter Title" className='form-control' value={title} onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className='mb-2'>
        <label htmlFor="">Author</label>
        <input type="text" placeholder='Enter Author Name' className='form-control' value={author} onChange={e=>setAuthor(e.target.value)} />
      </div>
      <div className='mb-2'>
        <label htmlFor="">Genre</label>
        <input type="text" placeholder='Enter Book Genre' className='form-control' value={genre} onChange={e=>setGenre(e.target.value)} />
      </div>
      <div className='mb-2'>
        <label htmlFor="">Publication Year</label>
        <input type="" placeholder="Enter Year of Publication" className='form-control' value={yop} onChange={e=>setYOP(e.target.value)}/>
      </div>
          <button className='btn btn-success' onClick={Update}>Update</button>
        </form>
      </div>
    </div>
    );
}

export default UpdateBooks;