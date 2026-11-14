import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AgencyForm from './pages/AgencyForm';
import BookingForm from './pages/BookingForm';
import Feedback from './pages/Feedback/Feedback';
import Reviews from './pages/Reviews/Reviews';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agency-form" element={<AgencyForm />} />
          <Route path="/booking-form" element={<BookingForm />} />
          <Route path="/book-driver" element={<BookingForm />} />
          <Route path="/services" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
