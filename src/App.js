import { Route, Router, Routes, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Movie from './pages/Movie'
import Mytickets from './pages/MyTickets'
import Profile from './pages/Profile'
function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/myticket" element={<Mytickets />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </div>
  );
}

export default App;
