import React, { Component } from 'react';
import './AddItemForm.css';

export default class AddItemForm extends Component {
  constructor(){
    super();

    this.state = {
      itemName: '',
      itemExpirationDate: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className='add-item-form'>
        <form onSubmit={this.handleSubmit}>
          <h1>
            Add Item Form
          </h1>
          <input 
            type='text'
            placeholder='Item Name'
            name='itemName'
            value={this.state.itemName}
            onChange={this.handleChange}
            required
          /><br />
          <input 
            type='date'
            name='itemExpirationDate'
            value={this.state.itemExpirationDate}
            onChange={this.handleChange}
            required
          /><br />
          <input 
            type='submit'
            value='Add Me!'
          />
        </form>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state));
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
}