import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AppWithProps from './AppWithProps';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<AppWithProps />, document.getElementById('root'));
registerServiceWorker();
