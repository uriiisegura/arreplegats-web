import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
// import RequireAuth from './components/RequireAuth';
import Home from "./pages/Home";
import QuiSom from "./pages/QuiSom";
// import Agenda from "./pages/Agenda";
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
import JuntaTecnica from "./pages/JuntaTecnica";
import Patrocinadors from "./pages/Patrocinadors";
import Fotografies from "./pages/Fotografies";
import Videos from "./pages/Videos";
import Musica from "./pages/Musica";
import Estatuts from "./pages/Estatuts";
import ReglamentRegimIntern from "./pages/ReglamentRegimIntern";
import ProtocolAgressions from "./pages/ProtocolAgressions";
import Jocs from "./pages/Jocs";
import NivellsSopaDeLletres from "./pages/NivellsSopaDeLletres";
import SopaLletres from "./pages/SopaLletres";
import NivellsMotsEncreuats from "./pages/NivellsMotsEncreuats";
import MotsEncreuats from "./pages/MotsEncreuats";
import NivellsPenjat from "./pages/NivellsPenjat";
import Memory from "./pages/Memory";
import Penjat from "./pages/Penjat";
import CastellsGame from "./pages/CastellsGame";
import Contactar from "./pages/Contactar";
import BarraLliure from "./pages/BarraLliure";
import PartsCastell from "./pages/PartsCastell";
import UnaNitDeMaig from "./pages/UnaNitDeMaig";
import Palette from "./pages/Palette";
import NotFound from "./pages/NotFound";
import './css/normalize.css';
import './css/main.css';
import './css/resizer.css';
import TitleUpdater from './components/TitleUpdater';
import AssajosCalendar from "./pages/AssajosCalendar";

function App() {
	return (<>
		<Router>
			<ScrollToTop />
			<TitleUpdater />
			<Routes>
				<Route path="/joc-castells" element={<></>} />
				<Route path="*" element={<NavBar />} />
			</Routes>
			<main className="page">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/qui-som" element={<QuiSom />} />
					{/* <Route path="/agenda" element={<Agenda withAssajos={true} />} /> */}
					<Route path="/agenda" element={<AssajosCalendar />} />
					<Route path="/assajos" element={<Assajos />} />
					<Route path="/gralles-i-tabals" element={<GrallesTabals />} />
					<Route path="/vida-universitaria" element={<VidaUniversitaria />} />
					<Route path="/historia-de-la-colla" element={<HistoriaDeLaColla />} />
					<Route path="/llista-de-caps-de-colla" element={<CapsDeColla />} />
					<Route path="/llista-de-presidents" element={<Presidents />} />
					<Route path="/els-castells-universitaris" element={<CastellsUniversitaris />} />
					<Route path="/millors-castells" element={<MillorsCastells />} />
					<Route path="/castells/:castell" element={<Castell />} />
					<Route path="/millors-diades" element={<MillorsDiades />} />
					<Route path="/resum-historic" element={<ResumHistoric />} />
					<Route path="/llista-de-diades" element={<LlistaDeDiades />} />
					<Route path="/junta-directiva" element={<JuntaDirectiva />} />
					<Route path="/junta-directiva/:any" element={<JuntaDirectiva />} />
					<Route path="/junta-tecnica" element={<JuntaTecnica />} />
					<Route path="/junta-tecnica/:any" element={<JuntaTecnica />} />
					<Route path="/patrocinadors" element={<Patrocinadors />} />
					<Route path="/fotografies" element={<Fotografies />} />
					<Route path="/videos" element={<Videos />} />
					<Route path="/musica" element={<Musica />} />
					<Route path="/estatuts" element={<Estatuts />} />
					<Route path="/reglament-regim-intern" element={<ReglamentRegimIntern />} />
					<Route path="/protocol-agressions" element={<ProtocolAgressions />} />
					<Route path="/jocs" element={<Jocs />} />
					<Route path="/sopa-de-lletres" element={<NivellsSopaDeLletres />} />
					<Route path="/sopa-de-lletres/:idx" element={<SopaLletres />} />
					<Route path="/mots-encreuats" element={<NivellsMotsEncreuats />} />
					<Route path="/mots-encreuats/:idx" element={<MotsEncreuats />} />
					<Route path="/memory" element={<Memory />} />
					<Route path="/penjat" element={<NivellsPenjat />} />
					<Route path="/penjat/:idx" element={<Penjat />} />
					<Route path="/contactar" element={<Contactar subject="Subjecte" text="Missatge" />} />
					<Route path="/barra-lliure" element={<BarraLliure />} />
					<Route path="/parts-castell" element={<PartsCastell />} />
					<Route path="/nit-fresca-per-ser-maig" element={<UnaNitDeMaig />} />
					<Route path="/palette" element={<Palette />} />

					<Route path="/joc-castells" element={<></>} />
					<Route path="/nit-fresca-per-ser-maig" element={<></>} />
					<Route path="/nit-fresca-per-ser-maig/:par" element={<></>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Routes>
				<Route path="/joc-castells" element={<main className="page page-full"><CastellsGame /></main>} />
				<Route path="/nit-fresca-per-ser-maig" element={<></>} />
				<Route path="/nit-fresca-per-ser-maig/:par" element={<UnaNitDeMaig />} />

				<Route path="*" element={<Footer />} />
			</Routes>
		</Router>
	</>
	);
}

export default App;