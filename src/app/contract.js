import { createSlice } from '@reduxjs/toolkit';

const initialState ={
	info: {
		lotto: {
			name:'lotto',
			displayName:'Lotto Smart Contract',
			information: 'Deploy a lottery smart contract. The manager deploys the contract sets the ticket size, max_fees, min prize pool, andgets compensated by min(5%, max_fees). People can ask for a refund anytime before lottery is drawn.',
			image:'/lotto.png',
			bg:'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))'
		},
		'assest_guardian': {
			name:'assest_guardian',
			displayName: 'Assets Guardian Contract',
			information: 'Set up a contract to decide when your benificaries recieve ethers, how much and at what intervals. Benificaries will be able to withdraw ethers once the contract releases their share. All benificaries will recieve same amount of ether.',
			image: '/guardian.jpg',
			bg:'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))'
		}
	}
}
export const contractSlice = createSlice({
	name: 'contract',
	initialState,
	reducers:{

	}

})

export default contractSlice.reducer
