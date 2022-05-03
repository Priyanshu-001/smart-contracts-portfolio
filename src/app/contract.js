import { createSlice } from '@reduxjs/toolkit';

const initialState ={
	info: {
		lotto: {
			name:'lotto',
			link:'lotto',
			displayName:'Lotto Smart Contract',
			information: 'Deploy a lottery smart contract. The manager deploys the contract sets the ticket size, max_fees, min prize pool, andgets compensated by min(5%, max_fees). People can ask for a refund anytime before lottery is drawn.',
			image:'/lotto.png',
			bg:'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))',
			code:'https://github.com/Priyanshu-001/smart-contracts-portfolio/blob/master/src/contracts/lotto/lotto.sol'
		},
		'uupsnft':{
			name:'uupsnft',
			link:'uupsnft',
			displayName:'Upgradable NFT smart contract',
			information:'An ERC721 contract that is also Upgradable',
			image:'/nft.gif',
			bg:'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))',
			code:'https://github.com/Priyanshu-001/smart-contracts-portfolio/blob/master/src/contracts/guardian/guardian.sol',
			

		},
		'guardian': {
			link:'guardian',
			name:'guardian',
			displayName: 'Assets Guardian Contract',
			information: 'Set up a contract to decide when your benificaries recieve ethers, how much and at what intervals. Benificaries will be able to withdraw ethers once the contract releases their share. All benificaries will recieve same amount of ether.',
			image: '/guardian.jpg',
			bg:'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))',
			code:'https://github.com/Priyanshu-001/smart-contracts-portfolio/blob/master/src/contracts/guardian/guardian.sol',
		},
		'simple_dao': {
			name:'simple_dao',
			displayName: 'Simple DAO',
			information: 'Introduce proposal,allocate ether for them,vote on them, proposals are passed with a simple majority. Caller can claim eth to carry out proposals.',
			image: '/dao.png',
			code:'https://github.com/Priyanshu-001/smart-contracts-portfolio/blob/master/src/contracts/simpleDAO/simpleDAO.sol',
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
