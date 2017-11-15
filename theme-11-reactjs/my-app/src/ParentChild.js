import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Child extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				Name: {this.props.childName}, Message: {this.props.message}
			</div>
		);
	}

}

class Parent extends Component {

	render() {
		console.log(this.props.children)

		const modifiedChildren = React.Children.map(this.props.children, function(child){
		
				console.log(child);	

				let toReturn = child;

				if(!child.props.hasAccess) {

					toReturn = React.cloneElement(child, {
						message: 'Sorry no access!'
					});

				}

				return toReturn;	
		
			});

		return (
			<div>
				{modifiedChildren}
			</div>
		);
	}	

}

export {
  Parent,
  Child
};
