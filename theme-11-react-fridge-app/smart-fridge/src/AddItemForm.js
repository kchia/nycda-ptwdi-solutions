import React, { Component } from 'react';
import './AddItemForm.css';

// https://facebook.github.io/react/docs/forms.html
export default class AddItemForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      itemExpirationDate: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className='add-item-form'>
        <form onSubmit={this.handleSubmit}>
          <h1>Add Item Form</h1>
          <input 
            type='text'
            value={this.state.itemName}
            onChange={this.handleChange}
            name='itemName'
            placeholder='Item Name'
            required 
          /><br />
          <input 
            type='date'
            value={this.state.itemExpirationDate}
            onChange={this.handleChange}
            name='itemExpirationDate' 
            required
          /><br />
          <input 
            type="submit"
            value="Add Me!" 
          />
        </form>
      </div>
    )
  }

  handleSubmit(event) {

    // without preventing default event behavior, the page will refresh and reset the app
    event.preventDefault();

    console.log('Adding new item!');

    const newItem = {
      id: this.props.mostRecentItemId + 1,
      name: this.state.itemName,
      expires: this.state.itemExpirationDate
    }; 

    this.props.addItem(newItem);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

}
