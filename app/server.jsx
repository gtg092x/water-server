import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'
import Layout from './layout'
import React from 'react'

let server = ((req, res) => {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.
            let routerContext = <RouterContext {...renderProps} />;
            let appMarkup = renderToString(<Layout app={routerContext} />);

            res.status(200).send(`<!doctype>${appMarkup}`);
        } else {
            res.status(404).send('Not found');
        }
    })
});

export default server;