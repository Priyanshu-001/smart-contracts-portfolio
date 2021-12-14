export default function keyValues({heading, amt,sub}){
	return(
		{amt} && (
				<div style={{'display': 'flex','justifyContents':'spaceAround', 'width': '100%'}}>
					<h3>
						{heading}
					</h3>
					<span>
						<h3>
							<code> {amt} </code>
							<br></br>
							<small   style={{'fontWeight':'200','fontSize': 'small'}}> {sub}</small>
		
						</h3>
						
					
					</span>
				</div>)
		)
}