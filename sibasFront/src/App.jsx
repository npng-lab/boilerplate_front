import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EditMain from './editor/EditMain';
import LandPage from './landing/Landpage.jsx';
import Header from './head/Header.jsx';
import Footer from './foot/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LandPage />} />
          <Route path="edit" element={<EditMain />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
