import {useState,useEffect} from 'react'
import About from './about.js'
export default function InstanceDetails({contract})
{
		return (

			 <ul>
			 	<li>
			 		<strong>Pls Note:</strong> Anyone can mint new assests
			 	</li>
				 	<li>
					 	This is a upgradable ERC721 contract
				 	</li>
				 	<li>
				 		Deployment/load existing contract
				 		<ul>
				 			<li>
				 				The Frontend allows you to deploy new instances of the contract (if metamask connected)
				 			</li>
				 			<li>
				 				You can also load existing contract if address know and if you are on the right chain.
				 			</li>
				 		</ul>
				 	</li>
				 	<li>
						Frontend features (once loaded)
						<ul>
							<li>
								Mint new assest
							</li>
							<li>
								View Existing assest through token ID
							</li>
							<li>
								Transfer assest to another account
							</li>
						</ul>
				 	</li>
				 </ul>
			)
}