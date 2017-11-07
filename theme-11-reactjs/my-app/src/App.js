import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
          <HelloWorld />
        </div>
        <HelloWorld />
      </div>
    )
  }
}

class HelloWorld extends Component {
  render() {
    return (
      <div>Hello World!</div>
    )
  }
}
