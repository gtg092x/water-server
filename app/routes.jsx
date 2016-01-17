import App from './app'
import Index from './components/index'
import Route from 'react-router'
import React from 'react';

const routes = (
    <Route component={App}>
        <Route path="/" component={Index}/>
    </Route>
)

export default routes