import React, { Component } from 'react';

// // Class/Container Pattern
// class Title extends Component {

//   render(){
//     return(
//       <h1>{this.props.name}</h1>
//     )
//   }
// }

// Functional/Presentational Pattern
const Title = (props) => <h1>{props.name}</h1>;

class Presentational extends Component {
  constructor() {
    super();
    this.state = {
      titleName: 'PTWDI Class'
    };
  }

  render() {
    return (
      <div>
        <Title 
          name={this.state.titleName}
        />
        <p>
          Boring!
        </p>
      </div>
    )
  }  
}


export default Presentational;