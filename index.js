var express = require('express');
var app = express();
var port = (process.env.PORT || 5000);
var dbUrl = process.env.DATABASE_URL;
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/register-device', function (req, res) {
    res.send('Posted: '+ JSON.stringify(req.headers) + ' ' + JSON.stringify(req.body));
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});