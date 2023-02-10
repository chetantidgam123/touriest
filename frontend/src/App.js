import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/register' element ={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
