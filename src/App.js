import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Uneixthi from "./pages/Uneixthi";
import QuiSom from "./pages/QuiSom";
import Assajos from "./pages/Assajos";
import HistoriaDeLaColla from "./pages/HistoriaDeLaColla";
import CapsDeColla from "./pages/CapsDeColla";
import Presidents from "./pages/Presidents";
import MillorsCastells from "./pages/MillorsCastells";
import ResumHistoric from "./pages/ResumHistoric";
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
          <Route path="/uneixthi" element={<Uneixthi />} />
          <Route path="/qui-som" element={<QuiSom />} />
          <Route path="/assajos" element={<Assajos />} />
          <Route path="/historia-de-la-colla" element={<HistoriaDeLaColla />} />
          <Route path="/llista-de-caps-de-colla" element={<CapsDeColla />} />
          <Route path="/llista-de-presidents" element={<Presidents />} />
          <Route path="/millors-castells" element={<MillorsCastells />} />
          <Route path="/castells/:castell" element={<Castell />} />
          <Route path="/resum-historic" element={<ResumHistoric />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
  );
}

export default App;
