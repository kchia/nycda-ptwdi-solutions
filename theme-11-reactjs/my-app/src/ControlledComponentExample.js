/** 
In HTML, form elements such as <input>, <textarea>, and <select> typically
 maintain their own state and update it based on user input. 
 In React, mutable state is typically kept in the state property of components, and only updated with setState().

We can combine the two by making the React state be the "single source of truth". 
Then the React component that renders a form also controls what happens in that form on subsequent user input. 
An input form element whose value is controlled by React in this way is called a "controlled component".

In a controlled component, form data is handled by a React component. 
The alternative is uncontrolled components, where form data is handled by the DOM itself.

Forms - Interactive Props
value: supported by <input> and <textarea> components.
checked: supported by <input> components of type checkbox or radio.
selected: supported by <option> components.

CONTROLLED COMPONENTS
form components that have the property "value" defined.
if you're going to define the "value" property you must define the "onChange" handler
so that you can be notified everytime the user modifies that form element.
With a controlled component, 
every state mutation will have an associated handler function. 
This makes it straightforward to modify or validate user input.
**/

import React, { Component } from 'react';

class ControlledComponentExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Nate',
      age: 12
    };

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h2>{this.state.age}</h2>
        <input
          type='text'
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    )
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    }, () => console.log(`My component state is updating: ${this.state.name}`));
  }
}

export default ControlledComponentExample;