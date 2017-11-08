import React, { Component } from 'react';
// import React, { Component, PropTypes } from 'react';

class HelloWorld extends Component {
	render() {
		console.log(this.props);
		// this.props.name = 'John';
		return <h1>Hello {this.props.name}! {this.props.age} </h1>
	}
}

// HelloWorld.propTypes = {
// 	name: PropTypes.string.isRequired
// }

class HelloFriend extends Component {

	constructor() {
		super()
		// setting up initial state of the component
		this.state = {
			name: ''
		}

		// setTimeout(() => this.updateName(), 2000);
		setTimeout(this.updateName.bind(this), 2000);
	}

	updateName() {
		console.log(this);
		this.setState({
			name: 'Lester'
		});
	}

	// updateName = () => {
	// 	console.log(this);
	// 	this.setState({
	// 		name: 'Lester'
	// 	});
	// }

	render() {
		return <h1>Hello {this.state.name}</h1>
	}

}

class AppWithProps extends Component {
	render() {
		return (
			<div>
				<span></span>
				<HelloWorld
					name='Tom'
					age={31} 
				/>
				<HelloFriend />
			</div>
		)
	}
}


export default AppWithProps;
