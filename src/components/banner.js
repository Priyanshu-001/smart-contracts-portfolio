
export default function banner({bg, title, address, winner=false,isInstance=false}){
	 // let success = <span style={{ background:'var(--green-500)',padding: '0.5rem',fontSize: '1rem' }}> Active</span>
	 // let drawn = <span style={{ background:'var(--yellow-500)',padding: '0.5rem',fontSize: '1rem' }}> Drawn</span>
	 let loc = <code> <b>At</b> {address}</code>
	 bg = bg || 'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))';
	 // const strip = isInstance ? <div width="100%" style={{width: '100%',backg}> Hello </div> : '';
	return(
	<div width="100%" style={{background: `${bg}`,boxShadow: 'rgb(0 0 0 / 75%) 1px 4px 14px -3px'}}>
		<div className="banner" width="100%" style={{  height: '15rem', 
		display: 'flex', 'alignItems': 'flex-end',
		'justifyContents': 'space-around',padding: '2.5rem',
			}} position="relative" >
			<div style={{textAlign:'left'}}>
			<h1 style={{ fontSize:'3.2rem' }}> {title} </h1>
			{!!address ? loc: ''}
			</div>
		</div>
		
	</div>
	)
}