import express from "express"
import path from 'path'
import webpack from 'webpack'

import bodyParser from 'body-parser'

let app = express();
let isDevelopment = (process.env.NODE_ENV !== 'production');
let static_path = path.join(__dirname, 'public');

const port = process.env.PORT || 8080;

app.use(express.static(static_path));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL
});

var bookshelf = require('bookshelf')(knex);

/* !!!!!!!MODELS!!!!!! */
import models from './server/models'

models(bookshelf);
/* !!!!!!!MODELS!!!!!! */


/* !!!!!!!ROUTES!!!!!! */
import routes from './server/routes'

routes(app);
/* !!!!!!!ROUTES!!!!!! */


if (isDevelopment) {
    var config = require('./webpack.config');
    var WebpackDevServer = require('webpack-dev-server');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true
    }).listen(3000, 'localhost', (err, result) => {
            if (err) { console.log(err) }
            console.log('Listening at localhost:3000');
        });
}

//bookshelf.DB.knex.client.getConnection().then(function (connection) {
    app.listen(port, (err) => {
        if (err) { console.log(err) };
        console.log(`Listening at localhost:${port}`);
    });
//}).catch(function (err) {
    //console.log('Ooops, something went wrong!', err);
//});

