import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import AppWithProps from './AppWithProps';
// import ContactCards from './ContactCards';
import Decrement from './Decrement';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<AppWithProps />, document.getElementById('root'));
// ReactDOM.render(<ContactCards />, document.getElementById('root'));
ReactDOM.render(<Decrement />, document.getElementById('root'));
registerServiceWorker();