import React, { Component } from "react";

class Assajos extends Component {
	render() {
		return (<>
			<section>
				<h2>Assajos</h2>

				<p>
					Els bons castells no surten del no-res: s'han d'assajar. Ens reunim dos dies a la setmana per fer història assaig a assaig.
				</p>
			</section>
			<section>
				<div className="rehearsal">
					<h3>Dimarts i dijous al migdia</h3>
					<p>De <span style={{ fontWeight: '600' }}>14:00 a 16:00</span> al pati d'Industrials (ETSEIB).</p>
					<iframe title="ETSEIB" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.5071049686835!2d2.1134493154257!3d41.3847923792644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49678ef40aebd%3A0x898caaf63b47e51b!2sEscola%20T%C3%A8cnica%20Superior%20d'Enginyeria%20Industrial%20de%20Barcelona%20(UPC)!5e0!3m2!1ses!2ses!4v1588686785662!5m2!1ses!2ses" />
				</div>
				<div className="rehearsal">
					<h3>Dijous al vespre</h3>
					<p>De <span style={{ fontWeight: '600' }}>20:00 a 22:00</span> al gimnàs d'assaig dels Castellers de Sants.</p>
					<iframe title="Castellers de Sants" src="https://www.google.com/maps/embed?pb=!4v1711817231053!6m8!1m7!1sUAStG173tbDkSuIxpIOp_Q!2m2!1d41.38031047587492!2d2.137471285682687!3f53.58123436952216!4f6.161186546629949!5f0.7820865974627469" />
				</div>
			</section>
		</>);
	}
}

export default Assajos;
