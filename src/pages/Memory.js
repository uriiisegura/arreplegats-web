import React, { Component } from "react";
import MemoryGame from "../components/MemoryGame";
import cards from "./../data/memory.json";

class Memory extends Component {
	render() {
		return (<>
			<section>
				<h2>Memory</h2>

				{
					<MemoryGame
						cards={cards[0].items}
						/>
				}
			</section>
		</>);
	}
}

export default Memory;
