// import { ProgressSpinner } from 'primereact/progressspinner';
export default function keyValues({heading, amt,sub,suffix}){
	const valuePanel = (	<>
								<code> {amt} {suffix} </code>
								<br></br>
								<small   style={{'fontWeight':'200','fontSize': 'small'}}> {sub}</small>
							</>
		)
	const loadingPanel = (
			<i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>

		)
	return(
				<div className="keyVal">
					<h3>
						{heading}
					</h3>
					<span>
						<h3 style={{'color':'gray', 'fontWeight':'400'}}>
						{!!amt ? valuePanel: loadingPanel}	
						</h3>
						
					
					</span>
					
				</div>
		)
}