import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();

    // initial default state
    this.state = {
      searchText: '',
      response: {}
    };

  }

  render() {

    const omdbResponse = this.state.response;

    return (
      <div>
        <input 
          placeholder='search'
          onChange={(event) => this.handleChange(event)}
        />
        <button onClick={() => this.handleClick()}>
          go
        </button>
        <h3>
          {this.state.searchText}
        </h3>
        <p>
          Title: {omdbResponse.Title}
        </p>
        <p>
          Year: {omdbResponse.Year} 
        </p>
        <p>
          Plot: {omdbResponse.Plot}
        </p>
      </div>
    );
  }

  componentDidMount() {

    const configuration = {
      params: {
        apiKey: '6d994fb3',
        t: 'buffy'
      }
    }

    axios
      .get('http://www.omdbapi.com/', configuration)
      .then((res) => {
        console.log(res.data);    
        this.setState({
          response: res.data
        });    
      });
  }

  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  handleClick() {

    const configuration = {
      params: {
        apiKey: '6d994fb3',
        t: this.state.searchText
      }
    }

    axios
      .get('http://www.omdbapi.com/', configuration)
      .then(res => {
        console.log(res);
        this.setState({
          response: res.data
        });
      })
      .catch(error => console.log(error))

  }
}

export default App;
