//https://codepen.io/gaearon/pen/WooRWa?editors=0010
/**

UNCONTROLLED COMPONENTS
It can sometimes be tedious to use controlled components, 
because you need to write an event handler for every way your data can change and 
pipe all of the input state through a React component. 
This can become particularly annoying when you are converting a preexisting codebase to React, or integrating a React application with a non-React library. 
In these situations, you might want to check out uncontrolled components, an alternative technique for implementing input forms.
Simply, form components that do not have a "value" property defined.
You can define the "defaultValue" if you want the component to be initialized with some value
To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.

In the React rendering lifecycle, the value attribute on form elements will override the value in the DOM. 
With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled.
To handle this case, you can specify a defaultValue attribute instead of value.

Don't overuse refs. Often, it becomes clear that the proper place to “own” that state is at a higher level in the hierarchy.

The ref attribute takes a callback function, and the callback will be executed immediately after the component is mounted or unmounted. 
Use the `ref` callback to store a reference to the text input DOM element in an instance field
(for example, this.textInput).

You may not use the ref attribute on functional components because they don’t have instances. 
You should convert the component to a class if you need a ref to it, 
just like you do when you need lifecycle methods or state.

When you need to handle multiple controlled input elements, 
you can add a name attribute to each element and let the handler 
function choose what to do based on the value of event.target.name.
*/
import React, { Component } from 'react';

class UncontrolledComponentExample extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // Explicitly print the input value using the raw DOM API
    console.log(this.input);
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input 
            // With an uncontrolled component, you often want React to specify the initial value, but leave subsequent updates uncontrolled. 
            // To handle this case, you can specify a defaultValue attribute instead of value.
            defaultValue="Bob"
            type="text"
            ref={(input) => this.input = input} 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UncontrolledComponentExample;