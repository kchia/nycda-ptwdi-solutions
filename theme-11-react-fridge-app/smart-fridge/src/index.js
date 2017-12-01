import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Fridge from './Fridge';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Fridge />, document.getElementById('root'));
registerServiceWorker();
