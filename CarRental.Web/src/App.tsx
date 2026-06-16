import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetails';
import Checkout from './pages/Checkout';
import BecomeHost from './pages/BecomeHost';
import HostDashboard from './pages/HostDashboard';
import Profile from './pages/Profile';
import Success from './pages/Success';
import NotFound from './pages/NotFound';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <Home />

          </ProtectedRoute>

        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cars" element={<CarListing />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/become-host" element={<BecomeHost />} />
        <Route path="/host-dashboard" element={
          <ProtectedRoute allowedRoles={['Owner']}>
            <HostDashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
