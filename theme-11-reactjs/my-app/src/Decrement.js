import React, { Component } from 'react';

const number = 10;

class Decrement extends Component {

	constructor() {
		super();
		// set up initial state
		this.state = {
			number: number	
		}

		this.decrement = this.decrement.bind(this);

	}

	decrement() {

		let currentNumber = this.state.number; 

		if (currentNumber === 0 ) {
			alert('Number cannot be less than zero');
		} else {
			this.setState({
				number: currentNumber - 1
			}, () => {

				let newNumber = this.state.number;
				let prevNumber = currentNumber;

				console.log(`Just changed number from 
					${prevNumber} to ${newNumber} successfully!`);
			});
		}
	}

	render() {
		return(
			<div>
				{this.state.number}
				<button type='button' onClick={this.decrement}>decrementConstructorFunction</button>
				<button type='button' onClick={() => this.decrement() }>decrementArrowFunction</button>
			</div>

		)
	}
}

export default Decrement;