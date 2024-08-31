import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Arreplegats";

    // Extract the first word after the slash
    const firstWord = path.split("/")[1];

    // Set the title based on the first word
    switch (firstWord) {
      case "":
        title = "Arreplegats";
        break;
      case "qui-som":
        title = "Qui Som - Arreplegats";
        break;
      case "agenda":
        title = "Agenda - Arreplegats";
        break;
      case "assajos":
        title = "Assajos - Arreplegats";
        break;
      case "gralles-i-tabals":
        title = "Gralles i Tabals - Arreplegats";
        break;
      case "vida-universitaria":
        title = "Vida Universitària - Arreplegats";
        break;
      case "historia-de-la-colla":
        title = "Història de la Colla - Arreplegats";
        break;
      case "llista-de-caps-de-colla":
        title = "Llista de Caps de Colla - Arreplegats";
        break;
      case "llista-de-presidents":
        title = "Llista de Presidents - Arreplegats";
        break;
      case "els-castells-universitaris":
        title = "Els Castells Universitaris - Arreplegats";
        break;
      case "millors-castells":
        title = "Millors Castells - Arreplegats";
        break;
      case "castells":
        title = "Castell - Arreplegats";
        break;
      case "millors-diades":
        title = "Millors Diades - Arreplegats";
        break;
      case "resum-historic":
        title = "Resum Històric - Arreplegats";
        break;
      case "llista-de-diades":
        title = "Llista de Diades - Arreplegats";
        break;
      case "junta-directiva":
        title = "Junta Directiva - Arreplegats";
        break;
      case "junta-tecnica":
        title = "Junta Tècnica - Arreplegats";
        break;
      case "patrocinadors":
        title = "Patrocinadors - Arreplegats";
        break;
      case "fotografies":
        title = "Fotografies - Arreplegats";
        break;
      case "videos":
        title = "Vídeos - Arreplegats";
        break;
      case "musica":
        title = "Música - Arreplegats";
        break;
      case "estatuts":
        title = "Estatuts - Arreplegats";
        break;
      case "reglament-regim-intern":
        title = "Reglament Règim Intern - Arreplegats";
        break;
      case "protocol-agressions":
        title = "Protocol Agressions - Arreplegats";
        break;
      case "jocs":
        title = "Jocs - Arreplegats";
        break;
      case "sopa-de-lletres":
        title = "Sopa de Lletres - Arreplegats";
        break;
      case "mots-encreuats":
        title = "Mots Encreuats - Arreplegats";
        break;
      case "memory":
        title = "Memory - Arreplegats";
        break;
      case "penjat":
        title = "Penjat - Arreplegats";
        break;
      case "contactar":
        title = "Contactar - Arreplegats";
        break;
      case "barra-lliure":
        title = "Barra Lliure - Arreplegats";
        break;
      case "parts-castell":
        title = "Parts Castell - Arreplegats";
        break;
      case "nit-fresca-per-ser-maig":
        title = "Una Nit de Maig - Arreplegats";
        break;
      case "palette":
        title = "Palette - Arreplegats";
        break;
      case "joc-castells":
        title = "Joc Castells - Arreplegats";
        break;
      default:
        title = "Arreplegats";
    }

    document.title = title;
  }, [location]);

  return null;
};

export default TitleUpdater;
