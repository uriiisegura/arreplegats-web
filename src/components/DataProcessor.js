import { useEffect } from "react";
import * as Papa from 'papaparse';

function DataProcessor(props) {
	const { setCastells, setPuntuacions } = props;
	const CASTELLS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvM_JNeX_MUNi4ZarVZDcj5CdyrDBTPbf3lDUrvUs_HvaX3S0k07yLmJKolAPf0BA6iM1FW4w1u83/pub?gid=0&single=true&output=csv";
	const SCORE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQeAif6pgFuLUAXHif4IsrSXzG8itYhirTHGdmNzA5RmrEPcJe7lcfwfNVLBEcgnn3mZbThqaZdouiP/pub?gid=1401475200&single=true&output=csv";

	const get_data = (link, callback) => Papa.parse(link, {
		download: true,
		header: true,
		complete: (results) => callback(results) 
	});

	const pad = (n, width, z) => {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	};

	const aggregate = (rows) => {
		const parseDate = (row) => pad(row["dia"],2)+"/"+pad(row["mes"],2)+"/"+row["any"];
		const get_diada_hash = (row) => parseDate(row) + " - " + row["motiu"];
		const diades = [...new Set(rows.map(row => get_diada_hash(row)))];

		let diades_dict = {};
		diades.forEach(diada_hash => {
			diades_dict[diada_hash] = {};
			const by_diada = rows.filter(row => get_diada_hash(row) === diada_hash);
			if (by_diada.length === 0) return;
			diades_dict[diada_hash]["info"] = (({ dia, mes, any, situació, ciutat, motiu }) => ({ dia, mes, any, situació, ciutat, motiu }))(by_diada[0]);
			
			diades_dict[diada_hash]["castells"] = by_diada.map(castell => (({ tipus, alçada, agulla, pinya, altres, ordre, resolució }) => ({ tipus, alçada, agulla, pinya, altres, ordre, resolució }))(castell));
			diades_dict[diada_hash]["castells"].forEach((castell, i) => {
				let resultat = castell["resolució"];
				const ordre = castell["ordre"];
				let resultatDavant = "";
				if (resultat.includes("pd") || resultat.includes("i")) {
					resultatDavant = resultat;
					resultat = "";
					//delete diades_dict[diada_hash]["castells"][i];
					//return;
				}
				const agulla = castell["agulla"] === "1" ? "a" : "";
				const perSota = castell["altres"] === "ps" ? "s" : "";
				const caminant = castell["altres"] === "cam" ? "cam" : "";
				const build = castell["tipus"].toUpperCase() + "d" + castell["alçada"] + perSota + agulla + castell["pinya"] + caminant;
				//if (build === "Pd5f") console.log(diada_hash)
				diades_dict[diada_hash]["castells"][i] = {};
				diades_dict[diada_hash]["castells"][i][ordre] = resultatDavant + build + resultat.toUpperCase();
			});
			diades_dict[diada_hash]["info"]["data"] = parseDate(diades_dict[diada_hash]["info"]);
			delete diades_dict[diada_hash]["info"]["dia"];
			delete diades_dict[diada_hash]["info"]["mes"];
			delete diades_dict[diada_hash]["info"]["any"];
		});

		return diades_dict;
	};

	const process_puntuacions = (data) => {
		let puntuacions_dict = {};
		data.forEach(castell => {
			puntuacions_dict[castell.castell] = [parseInt(castell["Descarregat"]), parseInt(castell["Carregat"])];
		});
		puntuacions_dict["Pd3cam"] = [14, 14];
		puntuacions_dict["Pd4cam"] = [119, 119];
		puntuacions_dict["Vd5"] = [571, 571];
		puntuacions_dict["Vd6f"] = [1911, 1911];
		puntuacions_dict["3d7+4d7"] = [2301, 2301];

		return puntuacions_dict;
	};

	useEffect(() => {
		get_data(CASTELLS_URL, (results) => {
			setCastells(aggregate(results.data));
		});

		get_data(SCORE_URL, (results) => {
			setPuntuacions(process_puntuacions(results.data));
		});
		// eslint-disable-next-line
	}, []);
}

export default DataProcessor;
