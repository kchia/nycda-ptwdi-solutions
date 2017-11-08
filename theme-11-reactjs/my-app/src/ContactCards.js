import React, { Component } from 'react';

const lisa = {
	contactName: 'Lisa',
	mobile: 123,
	work: 123,
	email: 'lisa@nycda.com',
	age: 103,
	zipcode: 10001,
	state: 'CA',
};

const john = {
	contactName:'John',
	mobile:1234567890,
	work:1234567890,
	email:'john@nycda.com',
	age:3,
	zipcode:10345,
	state:'CA',
};

class ContactCard extends Component {

	render(){
		return(
			<div>
				<h1>Contact Name: {this.props.contactName}</h1>
				<p>Mobile: {this.props.mobile}</p>
				<p>Work: {this.props.work}</p>
				<p>Email: {this.props.email}</p>
				<p>Age: {this.props.age}</p>
				<p>Zipcode: {this.props.zipcode}</p>
				<p>State: {this.props.state}</p>
			</div>
		)
	}
}

class ContactCards extends Component {
	render(){
		return(
			<div>
				<ContactCard
					{...lisa}
				/>
				<ContactCard 
					{...john}
				/>
				<ContactCard 
				  contactName='Hou'
				  mobile={1234567890}
				  work={1234567890} 
				  email='hou@nycda.com'
				  age={106}
				  zipcode={14001}
				  state='CA'
				/>
			</div>
		)
	}
}

export default ContactCards;
