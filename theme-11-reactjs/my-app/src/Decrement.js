import React, { Component } from 'react';

class Decrement extends Component {

  constructor(props) {
    super(props);
    // set up initial state
    this.state = {
      number: this.props.number  
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

// class EventExample extends Component {   
//   constructor() {
//     super();
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     alert('clicked save!');
//   },   

//   render() {
//     return(
//       <div>
//         <button
//           onClick={this.handleClick}
//         >
//           Save
//         </button>
//       </div>;
//     )
    
//   } 
// };

export default Decrement;