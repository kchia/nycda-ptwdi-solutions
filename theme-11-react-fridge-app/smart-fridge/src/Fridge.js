import React, { Component } from 'react';
import './Fridge.css';
import Items from './Items.js';
import AddItemForm from './AddItemForm.js';

const items = [
  {
    id: 1,
    name: 'Pizza',
    expires: '2017-2-15'
  },
  {
    id: 2,
    name: 'Chicken Pad Thai',
    expires: '2017-2-26'
  },
  {
    id: 3,
    name: 'Lemon Cake',
    expires: '2018-2-13'
  }
];

export default class Fridge extends Component {

  /** Initialize state with a constructor function. */
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      mostRecentItemId: null // trying to do this.state.items[this.state.items.length - 1].id will fail
    };

    /** Bind event handlers for the render method in the constructor */
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentWillMount() {
    this.setState({
      mostRecentItemId: this.state.items[this.state.items.length - 1].id
    }, () => console.log(`Most recent item id: ${this.state.mostRecentItemId}`));
  }

  /** Renders the Fridge app and its child components 'Items','AddItemForm'. 
  Data are passed from App to children via props */
  render() {
    return (
      <div className="fridge">
        <h1>
          SMART FRIDGE
        </h1>
        <Items
          deleteItem={this.deleteItem} 
          items={this.state.items}
        />
        <AddItemForm 
          addItem={this.addItem}
          mostRecentItemId={this.state.mostRecentItemId}
        />
      </div>
    );
  }
  
  addItem(item) {
    /** Create a copy of the original items array */
    let items = this.state.items.slice();

    items.push(item);

    this.setState({
      items,
      mostRecentItemId: this.state.mostRecentItemId + 1
    }, () => console.log(`Successfully updated items in fridge: ${JSON.stringify(this.state.items)}`))

  }

  deleteItem(itemToDeleteId) {
    let items = this.state.items.slice();
    let itemToDeleteIndex;

    // find index of item to be removed in the original list
    items.forEach((item, index) => {
      if(item.id === itemToDeleteId) {
        itemToDeleteIndex = index;
      }
    });

    items.splice(itemToDeleteIndex, 1);

    this.setState({
      items
    }, () => console.log(`Successfully updated items in fridge: ${JSON.stringify(this.state.items)}`))
  }

}
