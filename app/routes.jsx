import App from './app'
import Index from './components/index'
import About from './components/about'
import {Route}from 'react-router'
import React from 'react';

const routes = (
    <Route component={App}>
        <Route path="/" component={Index}/>
        <Route path="/About" component={About}/>
    </Route>
)

export default routes