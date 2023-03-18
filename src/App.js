import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import DataProcessor from "./components/DataProcessor";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home";
import QuiSom from "./pages/QuiSom";
import Assajos from "./pages/Assajos";
import GrallesTabals from "./pages/GrallesTabals";
import VidaUniversitaria from "./pages/VidaUniversitaria";
import HistoriaDeLaColla from "./pages/HistoriaDeLaColla";
import CapsDeColla from "./pages/CapsDeColla";
import Presidents from "./pages/Presidents";
import CastellsUniversitaris from "./pages/ElsCastellsUniversitaris";
import MillorsCastells from "./pages/MillorsCastells";
import Castell from "./pages/Castell";
import MillorsDiades from "./pages/MillorsDiades";
import ResumHistoric from "./pages/ResumHistoric";
import LlistaDeDiades from "./pages/LlistaDeDiades";
import JuntaDirectiva from "./pages/JuntaDirectiva";
import ComissioTecnica from "./pages/ComissioTecnica";
import Agenda from "./pages/Agenda";
import Noticies from "./pages/Noticies";
import Fotografies from "./pages/Fotografies";
import Videos from "./pages/Videos";
import Arreplegator from "./pages/Arreplegator";
import Contacte from "./pages/Contacte";
import Contractacions from "./pages/Contractacions";
import Uneixthi from "./pages/Uneixthi";
import BarraLliure from "./pages/BarraLliure";
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
          <Route path="/gralles-i-tabals" element={<GrallesTabals />} />
          <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
          <Route path="/historia-de-la-colla" element={<HistoriaDeLaColla />} />
          <Route path="/llista-de-caps-de-colla" element={<CapsDeColla />} />
          <Route path="/llista-de-presidents" element={<Presidents />} />
          <Route path="/els-castells-universitaris" element={<CastellsUniversitaris />} />
          <Route path="/millors-castells" element={<MillorsCastells />} />
          <Route path="/castells/:castell" element={<Castell />} />
          <Route path="/millors-diades" element={<MillorsDiades {...exports} />} />
          <Route path="/resum-historic" element={<ResumHistoric {...exports} />} />
          <Route path="/llista-de-diades" element={<LlistaDeDiades {...exports} />} />
          <Route path="/junta-directiva" element={<JuntaDirectiva />} />
          <Route path="/comissio-tecnica" element={<ComissioTecnica />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/noticies" element={<Noticies />} />
          <Route path="/fotografies" element={<Fotografies />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/arreplegator" element={<Arreplegator />} />
          <Route path="/contacte" element={<Contacte />} />
          <Route path="/contractacions" element={<Contractacions />} />
          <Route path="/uneixthi" element={<Uneixthi />} />
          <Route path="/barra-lliure" element={<BarraLliure />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
    <Footer />
  </>
  );
}

export default App;
