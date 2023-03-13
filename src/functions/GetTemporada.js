import IsFromTemporada from "./IsFromTemporada";
import FromEuropean from "./FromEuropean";

function GetTemporada(data) {
	let year;
	try {
		year = data.getFullYear();
	} catch {
		data = FromEuropean(data);
		year = data.getFullYear();
	}
	
	if (IsFromTemporada(data, year+'-'+(year+1)))
		return year+'-'+(year+1);
	return (year-1)+'-'+year;
};

export default GetTemporada;
