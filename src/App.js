import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import DataProcessor from "./components/DataProcessor";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
// import RequireAuth from './components/RequireAuth';
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
import Jocs from "./pages/Jocs";
import NivellsSopaDeLletres from "./pages/NivellsSopaDeLletres";
import SopaLletres from "./pages/SopaLletres";
import NivellsMotsEncreuats from "./pages/NivellsMotsEncreuats";
import MotsEncreuats from "./pages/MotsEncreuats";
import NivellsPenjat from "./pages/NivellsPenjat";
import Memory from "./pages/Memory";
import Penjat from "./pages/Penjat";
import CastellsGame from "./pages/CastellsGame";
import Contractacions from "./pages/Contractacions";
import Uneixthi from "./pages/Uneixthi";
import Contactar from "./pages/Contactar";
import BarraLliure from "./pages/BarraLliure";
import Palette from "./pages/Palette";
import NotFound from "./pages/NotFound";
import './css/normalize.css';
import './css/main.css';
import './css/resizer.css';

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
			<ScrollToTop />
			<Routes>
				<Route path="/joc-castells" element={<></>} />
				<Route path="*" element={<NavBar />} />
			</Routes>
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
					<Route path="/jocs" element={<Jocs />} />
					<Route path="/sopa-de-lletres" element={<NivellsSopaDeLletres />} />
					<Route path="/sopa-de-lletres/:idx" element={<SopaLletres />} />
					<Route path="/mots-encreuats" element={<NivellsMotsEncreuats />} />
					<Route path="/mots-encreuats/:idx" element={<MotsEncreuats />} />
					<Route path="/memory" element={<Memory />} />
					<Route path="/penjat" element={<NivellsPenjat />} />
					<Route path="/joc-castells" element={<></>} />
					<Route path="/penjat/:idx" element={<Penjat />} />
					<Route path="/contractacions" element={<Contractacions />} />
					<Route path="/uneixthi" element={<Uneixthi />} />
					<Route path="/contactar" element={<Contactar subject="Subjecte" text="Missatge" />} />
					<Route path="/palette" element={<Palette />} />
					<Route path="/barra-lliure" element={<BarraLliure />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Routes>
				<Route path="/joc-castells" element={<main className="page page-full"><CastellsGame /></main>} />
				<Route path="*" element={<Footer />} />
			</Routes>
		</Router>
	</>
	);
}

export default App;
