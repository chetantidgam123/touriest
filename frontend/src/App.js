import { Route, Routes, json } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Header from './Components/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './Redux/features/authSlice';

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    dispatch(setUser(user))
  }, [])

  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
