function IsFromTemporada(date, temporada) {
	const start_temporada = new Date(`09/01/${temporada.split('-')[0]}`);
	const end_temporada = new Date(`08/31/${temporada.split('-')[1]}`);
	return start_temporada <= date && date <= end_temporada;
}

export default IsFromTemporada;
