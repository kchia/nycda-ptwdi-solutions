import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormEdit.css';

class FormEdit extends Component {

	constructor(props) {
		super(props);

		this.state = {
			isEditMode: false,
			firstName: props.firstName,
			lastName: props.lastName,
			firstNameEditMode: props.firstName,
			lastNameEditMode: props.lastName
		};

		// this.toggleEditMode = this.toggleEditMode.bind(this);		
	}

	render() {
		return (
			<div>
				<div 
					className={this.state.isEditMode ? 'default-mode' : 'non-default-mode'}
				>
					<div>
						First Name: {this.state.firstName}
					</div>
					<div>
						Last Name: {this.state.lastName}
					</div>
					<button
						onClick={() => this.toggleEditMode()}
					>
						Edit
					</button>
				</div>
				<div
					className={this.state.isEditMode ? 'edit-mode' : 'edit-mode-hidden' }
				>
					<input
						name='firstNameEditMode'
						type='text'
						value={this.state.firstNameEditMode}
						onChange={(event) => this.handleInputChange(event)}
					/>
					<input
						name='lastNameEditMode'
						type='text'
						value={this.state.lastNameEditMode}
						onChange={(event) => this.handleInputChange(event)}
					/>
					<button 
					  onClick={() => this.handleSave()}
					>
					  Save
					</button>
					<button 
					  onClick={() => this.toggleEditMode()}
					>
					  Cancel
					</button>
				</div>
			</div>
		)
	}

	toggleEditMode() {
		console.log('Clicked Edit button!');
		this.setState(currentState => ({
			isEditMode: !currentState.isEditMode
		}), () => console.log(`Edit mode: ${this.state.isEditMode}`));
	}

	handleInputChange(event) { 
		const target = event.target;
		const value = target.value;
		const name = target.name; 

		this.setState({
			[name]: value
		}, () => console.log(`Syncing input value with state: ${JSON.stringify(this.state)}`));
	}

	// handleInputChangeForLastName(event) {
	// 	this.setState({
	// 		lastNameEditMode: event.target.value
	// 	}, () => console.log(`Syncing last name input value with state: ${this.state.lastNameEditMode}`));
	// }

	handleSave() {
		 this.setState({
      firstName: this.state.firstNameEditMode,
      lastName: this.state.lastNameEditMode
    }, () => this.toggleEditMode());
	}
}

FormEdit.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export default FormEdit;