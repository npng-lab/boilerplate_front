import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EditMain from './editor/EditMain';
import Header from './head/Header.jsx';
import Footer from './foot/Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="edit" element={<EditMain />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
