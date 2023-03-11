import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import MillorsCastells from "./pages/MillorsCastells";
import Castell from "./pages/Castell";
import NotFound from "./pages/NotFound";
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
          <Route path="/millors-castells" element={<MillorsCastells />} />
          <Route path="/castells/:castell" element={<Castell />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
  );
}

export default App;
