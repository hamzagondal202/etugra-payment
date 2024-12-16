import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css"
import LandingPage from './pages/LandingPage';
import Checkout from './pages/Checkout';
import StartCard from './pages/StartCard';
import Payment from './pages/Payment';
import Verification from './pages/Verification';
import Complete from './pages/Complete';
import DeliveryAddress from './pages/DeliveryAddress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="customer-info" element={<DeliveryAddress/>}/>
        <Route path="/smart-card" element={<StartCard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/verify-account" element={<Verification />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
