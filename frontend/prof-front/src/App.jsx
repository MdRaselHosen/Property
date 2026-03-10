import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
