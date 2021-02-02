import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css'


function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

function App() {

	const [name, setName] = useState('rahul')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:3003/payment', { method: 'GET' }).then((t) =>
			t.json()
		)

		console.log(data);
		const options = {
			key: __DEV__ ? 'rzp_test_cl2n3cl5kE260r' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Toppers notes',
			description: 'Thank you for nothing. Please give us some money',
			image: logo,
			handler: function (response) {
				alert("thank you..."+"paymentId: "+response.razorpay_payment_id+" orderId: "+response.razorpay_order_id)
			
			},
			prefill: {
				name,
				email: 'rajanyak91@gmail.com',
				phone_number: '8003050064'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>
					Toppers Notes
				</h1>
               <p>
                  To get all the Toppers easy notes click on PAY NOW.....
               </p>
				<button
					//className="App-link"
					onClick={displayRazorpay}
					//target="_blank"
					//rel="noopener noreferrer"
				>
					PAY NOW
				</button>
			</header>
		</div>
	)
}

export default App
