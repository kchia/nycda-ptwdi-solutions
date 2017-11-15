import React, { Component } from 'react';

export default class Counter extends Component {

  /** 
    BIRTH/MOUNTING PHASE
  **/

  // - called once immediately before the render method is executed
  // - calling setState in this function will not cause render to be called more than once.
  // - problematic to make ajax requests here
  componentWillMount() {
    console.log('componentWillMount');
  }

  // - returns the component markup, which can be a single child component, 
  // a set of components, null, or false (in case you don't want any rendering)
  render() {
    console.log('render');

    return (
      <h1 className="text-muted">Counter: {this.props.value}</h1>
    );
  }

  // - window.setTimeout(function() {}, 100)...
  // - called once immediately after the initial rendering has occured
  // - the DOM is now available at this point,
  // - this is where you'll want to use setInterval, setTimeout, and ajax requests.
  componentDidMount() {
    console.log('componentDidMount');
  }

  /**
    GROWTH/UPDATE PHASE
  **/

  // - do something with nextProps here
  // - Used when the Parent element modifies the props of a child.
  // - invoked when a child component is receiving new/updated props
  // - it's not called for the initial render
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  // - return true if it should update; false otherwise
  // - this function determines whether or not the component should update itself.
  // - if the function returns true, the component will update and the rest of the lifecycle steps will be called
  // - if the function returns false, the component will not update and no other lifecycle functions will be called.
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');

    return true;
  }

  // - invoked immediately before rendering when new props or state are received
  // - you can't use this.setState() in this method!!
  // - should be used only to prepare for an update, not trigger an update itself
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  // - invoked immediately after the component's updates are sent to the DOM
  // - can be used to operate on the DOM after a component has been updated
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  /**
    DEATH/UNMOUNT
  **/

  // - some cleanup code here
  // - invoked immediately before a component is unmounted/removed from the DOM
  // - perform any necessary cleanup in this method, such as clearing timers or cleaning up 
  // any DOM elements that were created in componentDidMount
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

};
