import envConfig from './config'

import express from "express"
import path from 'path'
import webpack from 'webpack'

import bodyParser from 'body-parser'

let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.set('io',io);

let isDevelopment = (process.env.NODE_ENV !== 'production');
let static_path = path.join(__dirname, 'public');

const port = process.env.PORT || 8080;


app.use(express.static(static_path));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

import db from './server/db'
app.set('db', db);
import models from './server/models'
models(app)
/* !!!!!!!ROUTES!!!!!! */
import routes from './server/routes'

routes(app);
/* !!!!!!!ROUTES!!!!!! */



if (isDevelopment) {
    var config = require('./webpack.config');
    var WebpackDevServer = require('webpack-dev-server');
    let webpackPublicPath = "http://" + 'localhost' + ":3000" + config.output.publicPath;
    new WebpackDevServer(webpack(config), {
        publicPath: webpackPublicPath,
        hot: true
    }).listen(3000, 'localhost', (err, result) => {
            if (err) { console.log(err) }
            console.log('Listening at localhost:3000');
        });
    app.set('bundle-server',webpackPublicPath);
}

db.sync().then(function (connection) {
    http.listen(port, (err) => {
        if (err) { console.log(err) };
        console.log(`Listening at localhost:${port}`);
    });
}).catch(function (err) {
    console.log('Ooops, something went wrong!', err);
});

