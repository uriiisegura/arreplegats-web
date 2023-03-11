import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import './css/main.css';
import './css/normalize.css';

function App() {
  return (<>
    <Router>
      <NavBar />
      <ScrollToTop />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
  );
}

export default App;
