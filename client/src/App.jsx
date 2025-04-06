import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/User/Profile';
import Schedule from './components/Appointments/Schedule';
import History from './components/Appointments/History';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import SendEmail from './components/Notifications/SendEmail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/history" element={<History />} />
          <Route path="/send-email" element={<SendEmail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;