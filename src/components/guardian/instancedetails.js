/* global BigInt */
import {useState,useEffect} from 'react'
import Web3 from 'web3'
import KeyValues from '../keyValues';

export default function InstanceDetails({contract})
{	
	const [amt,setAmt] = useState(0);
	const [totalPerBenificary ,setTotalPerBenificary] = useState(0);
	const [startDate,setStartDate] = useState(null);
	const [nextInterval, setNextInterval] = useState(null)
	async function getDetails()
	{
		
			let amtPromise =  contract.methods.amt().call()

			let timesPromise = contract.methods.times().call()

			let startDatePromise = contract.methods.startdate().call()
			let intervalPromise = contract.methods.interval().call()

			Promise.all([amtPromise,timesPromise, startDatePromise, intervalPromise])
			.then(values=>{
				let [amt,times,startDate,interval] = values
				let ethAmt = Web3.utils.fromWei(amt,'ether')
				setAmt(ethAmt)

				amt = BigInt(amt)
				times = BigInt(times)
				let total = BigInt(amt*times)
				total = String(total)
				total = Web3.utils.fromWei(total)
				setTotalPerBenificary(total)

				setStartDate(()=>{ 
				 			 		let timeStamp = new	Date(startDate*1000)
				 			 		return timeStamp.toString()
				 			 	})
				setNextInterval(interval)				
			})
		
		
	}
	
	useEffect(()=>getDetails(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[])

	return (
		<>
			<KeyValues heading="Amt per Withdraw" amt={amt} suffix=" Ether"/>
			<KeyValues heading="Total ether per benificary" amt={totalPerBenificary} suffix=" Ether"/>
			<KeyValues heading="Start Date" amt={startDate}/>
			<KeyValues heading="Interval" amt={nextInterval} suffix=" seconds"/>



		</>
	)
}