import React, { Component } from 'react';
import Items from '../Items';
import AddItemForm from '../AddItemForm';
import './Fridge.css';

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

  constructor() {
    super();
    this.state = {
      items: items,
      mostRecentItemId: null
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentWillMount() {
    this.setState({
      mostRecentItemId: this.state.items[this.state.items.length - 1].id
    }, () => console.log(`Most recent item id: ${this.state.mostRecentItemId}`));
  }
  
  render(){
    return (
      <div className='fridge'>
        <h1>
          SMART FRIDGE
        </h1>
        <Items 
          items={this.state.items}
          deleteItem={this.deleteItem}
        />
        <AddItemForm 
          addItem={this.addItem}
          mostRecentItemId={this.state.mostRecentItemId}
        />
      </div>
    )
  }

  deleteItem (itemToDeleteId) {
    let items = [...this.state.items];
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

  addItem(item) {
    let items = [...this.state.items];

    items.push(item);

    this.setState({
      items
    }, () => console.log(`Successfully updated items in fridge: ${JSON.stringify(this.state.items)}`))
  }
}
