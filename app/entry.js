import React from 'react';
import Routes from './routes';
import { Router, Route, Link, browserHistory } from 'react-router'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <Router history={browserHistory}>{Routes}</Router>,
    document.getElementById('layout')
);