import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import AppWithProps from './AppWithProps';
// import ContactCards from './ContactCards';
// import Decrement from './Decrement';
// import Folder from './Folder';
// import ControlledComponentExample from './ControlledComponentExample';
// import UncontrolledComponentExample from './UncontrolledComponentExample';
// import FormEdit from './FormEdit';
import List from './List';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<AppWithProps />, document.getElementById('root'));
// ReactDOM.render(<ContactCards />, document.getElementById('root'));
// ReactDOM.render(<Decrement number={10} />, document.getElementById('root'));
// ReactDOM.render(<Folder />, document.getElementById('root'));
// ReactDOM.render(<ControlledComponentExample />, document.getElementById('root'));
// ReactDOM.render(<UncontrolledComponentExample />, document.getElementById('root'));
// ReactDOM.render(<FormEdit 
// 	firstName='Hou'
// 	lastName='Chia' 
// 	/>, document.getElementById('root'));
ReactDOM.render(<List />, document.getElementById('root'));
registerServiceWorker();
