import Banner from '../components/banner';
import {Card} from 'primereact/card';
import Actions from '../components/lotto/actions.js';
import About from '../components/lotto/about.js'
export  default function lotto(){
	const bg = 'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))'
	
			return (
			<>
				<Banner bg={bg} title="lotto contract"/>
				<main className="main">
					<div className="details">
								<About />
					
					</div>
					<div className="actions">
					
					<Card title="Actions" >
					<Actions />

					</Card>
					</div>
				</main>
			</>
			)
}