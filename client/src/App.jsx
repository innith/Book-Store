import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateBook from './CreateBook'
import UpdateBooks from './UpdateBook'
import Books from './Books'
import GetBook from './GetBook'
function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Books />}></Route>
      <Route path='/create' element={<CreateBook/>}></Route>
      <Route path='/update/:id' element={<UpdateBooks/>}></Route>
      <Route path='/getBook/:id' element={<GetBook/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
