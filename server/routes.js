import reactServer from '../app/server'

import registerDevice from './controllers/register-device'
import alarm from './controllers/alarm'

export default (app) => {
    app.post('/register-device', registerDevice);
    app.post('/alarm', alarm);
    app.get('/list-readings', require('./controllers/list-readings'));
    app.use(reactServer);
};