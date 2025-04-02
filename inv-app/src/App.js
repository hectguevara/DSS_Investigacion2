import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/User/Profile';
import Schedule from './components/Appointments/Schedule';
import History from './components/Appointments/History';
import Navbar from './layout/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  console.log('Login:', Login);
console.log('Register:', Register);
console.log('Profile:', Profile);
console.log('Schedule:', Schedule);
console.log('History:', History);
console.log('Navbar:', Navbar);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
