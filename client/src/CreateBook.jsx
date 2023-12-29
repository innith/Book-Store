import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [title,setTitle] = useState()
  const [author,setAuthor] = useState()
  const [genre,setGenre] = useState()
  const [yop,setYOP] = useState()

  const navigate = useNavigate()

  const Submit=(e)=>{
    e.preventDefault();
    axios.post("http://127.0.0.1:3000/books",{
      "title":title,
      "author":author,
      "genre":genre,
      "publication_year":yop
    })
    .then(result=>{
      console.log(result);
      navigate('/')
    })
    .catch(err=>console.log(err));
  }
  return (<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
  <div className='w-50 bg-white rounded p-3'>
    <form onSubmit={Submit}>
      <h2>Add Book</h2> 
      <div className='mb-2'>
        <label htmlFor="">Title</label>
        <input type="text" placeholder="Enter Title" className='form-control' onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className='mb-2'>
        <label htmlFor="">Author</label>
        <input type="text" placeholder='Enter Author Name' className='form-control' onChange={e=>setAuthor(e.target.value)} />
      </div>
      <div className='mb-2'>
        <label htmlFor="">Genre</label>
        <input type="text" placeholder='Enter Book Genre' className='form-control' onChange={e=>setGenre(e.target.value)} />
      </div>
      <div className='mb-2'>
        <label htmlFor="">Publication Year</label>
        <input type="" placeholder="Enter Year of Publication" className='form-control'  onChange={e=>setYOP(e.target.value)}/>
      </div>
      <button className='btn btn-success'>Submit</button>
    </form>
  </div>
</div>
  );
}

export default CreateBook;