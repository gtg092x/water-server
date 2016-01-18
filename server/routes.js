import reactServer from '../app/server'

import registerDevice from './controllers/register-device'

export default (app) => {
    app.post('/register-device', registerDevice);
    app.get('/list-readings', require('./controllers/list-readings'));
    app.use(reactServer);
};