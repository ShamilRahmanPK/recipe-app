import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Landing from "./pages/Landing";
import Home from './pages/Home';
import View from './pages/View';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/:id/view' element={<View/>} />
    </Routes>
    </>
  )
}

export default App
