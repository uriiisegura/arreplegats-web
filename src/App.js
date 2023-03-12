import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import DataProcessor from "./components/DataProcessor";
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
import LlistaDeDiades from "./pages/LlistaDeDiades";
import Castell from "./pages/Castell";
import Arreplegator from "./pages/Arreplegator";
import NotFound from "./pages/NotFound";
import './css/main.css';
import './css/normalize.css';

function App() {
  const [diades, setCastells] = useState({});
  const [puntuacions, setPuntuacions] = useState({});

  const exports = {
    'diades': diades,
    'setCastells': setCastells,
    'puntuacions': puntuacions,
    'setPuntuacions': setPuntuacions
  };

  useEffect(() => {
  }, [diades]);
  useEffect(() => {
  }, [puntuacions]);
  
  return (<>
    <DataProcessor {...exports} />

    <Router>
      <NavBar />
      <ScrollToTop />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qui-som" element={<QuiSom />} />
          <Route path="/assajos" element={<Assajos />} />
          <Route path="/historia-de-la-colla" element={<HistoriaDeLaColla />} />
          <Route path="/llista-de-caps-de-colla" element={<CapsDeColla />} />
          <Route path="/llista-de-presidents" element={<Presidents />} />
          <Route path="/millors-castells" element={<MillorsCastells />} />
          <Route path="/castells/:castell" element={<Castell />} />
          <Route path="/resum-historic" element={<ResumHistoric {...exports} />} />
          <Route path="/llista-de-diades" element={<LlistaDeDiades {...exports} />} />
          <Route path="/arreplegator" element={<Arreplegator />} />
          <Route path="/uneixthi" element={<Uneixthi />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
  );
}

export default App;
