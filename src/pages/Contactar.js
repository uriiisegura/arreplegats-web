import React, { Component } from "react";

class Contactar extends Component {
	render() {
		return (<>
			<section>
				<h2>Contactar</h2>

				<ul className="contact-info">
					<li><img src="/font-awesome/mail.svg" alt="Email" style={{ width: '14px', height: '14px' }} /> Correu electrònic: <a href="mailto:junta.arreplegats@gmail.com">junta.arreplegats@gmail.com</a></li>
					<li><img src="/font-awesome/phone.svg" alt="Phone" style={{ width: '14px', height: '14px' }} /> Mòbil/Whatsapp: <a href="tel:+34681236024">+34 681 236 024</a> (Andreu)</li>
					<br />
					<li><img src="/font-awesome/twitter-x.svg" alt="Twitter" style={{ width: '14px', height: '14px' }} /> Twitter: <a href="https://www.x.com/arreplegats" target="_blank" rel="noreferrer">@arreplegats</a></li>
					<li><img src="/font-awesome/instagram.svg" alt="Instagram" style={{ width: '14px', height: '14px' }} /> Instagram: <a href="https://www.instagram.com/arreplegats" target="_blank" rel="noreferrer">@arreplegats</a></li>
					<li><img src="/font-awesome/youtube.svg" alt="YouTube" style={{ width: '14px', height: '14px' }} /> YouTube: <a href="https://www.youtube.com/channel/UC-RVCefwipBS8WutREwbTmw" target="_blank" rel="noreferrer">Arreplegats de la ZU</a></li>
					<li><img src="/font-awesome/twitch.svg" alt="Twitch" style={{ width: '14px', height: '14px' }} /> Twitch: <a href="https://www.twitch.tv/arreplegatszu" target="_blank" rel="noreferrer">@arreplegatszu</a></li>
					<li><img src="/font-awesome/tiktok.svg" alt="TikTok" style={{ width: '14px', height: '14px' }} /> TikTok: <a href="https://www.tiktok.com/@arreplegats" target="_blank" rel="noreferrer">@arreplegats</a></li>
					<li><img src="/font-awesome/facebook.svg" alt="Facebook" style={{ width: '14px', height: '14px' }} /> Facebook: <a href="https://www.facebook.com/arreplegats" target="_blank" rel="noreferrer">@arreplegats</a></li>
				</ul>

				<br />

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img src="/images/colla-all.jpg" alt="Colla dels Arreplegats" style={{ width: '90%', transform: 'scale(1.05)' }} />
				</div>

				<br />

				<div className="contact-invitation">
					<p>Ens encantaria escoltar-te! Si tens qualsevol pregunta, suggeriment o simplement vols saludar, no dubtis en posar-te en contacte amb nosaltres.</p>
					<p>També pots seguir-nos a les nostres xarxes socials per estar al dia de totes les nostres activitats i esdeveniments.</p>
					<p>Esperem tenir notícies teves aviat!</p>
				</div>
			</section>
		</>);
	}
}

export default Contactar;
