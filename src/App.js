import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import Movie from './pages/Movie'
import Mytickets from './pages/MyTickets'
import Profile from './pages/Profile'
import Loginpage from './components/Loginpage'
import Registerpage from './components/Registerpage'
import MovieDetail from './pages/MovieDetail'
function App() {
  return (
    <Router>
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myticket" element={<Mytickets />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />

          <Route path="/movie/:id" element={<MovieDetail />} />


          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/signin' element={<Registerpage/>}/>
        </Routes>
      </div>
    </AuthProvider>
  </Router>
  );
}

export default App;
