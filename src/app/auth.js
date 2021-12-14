import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

const initialState = {
	account: '',
	web3: null,
	loggedIn: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	
	reducers:{	
			disconnect: state=>{
				state.account = ''
				state.web3 = null
				state.loggedIn = false
			},
			connected: (state,payload)=>{
				state.web3 = payload.web3
				state.account =  payload.account
				state.loggedIn = true
			},
			initWeb3:state=>{
				if(window.ethereum)
				{	state.web3 = new Web3(window.ethereum)
				    
				}
			else if(window.web3)
				{
					state.web3 = new Web3(window.web3.currentProvider)
				}
			}


	},
	
})


export const {disconnect,connected,initWeb3} = authSlice.actions
export default authSlice.reducer
