import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContainer from './components/Login';
import LandingPage from './components/Main';
import Navbar from './components/Navbar';
import ResourcePage from './components/ResourcePage';
import ContactForm from './components/Contact';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/resource" element={<ResourcePage />} />
        <Route path='/contact' element={<ContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
