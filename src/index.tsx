import React from 'react';
import ReactDOM  from 'react-dom/client';
import './Styles/MainStyles.scss';

import Main from './Pages/Router/Router';

// @ts-ignore
const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<Main />)