import reactServer from '../app/server'

import registerDevice from './controllers/register-device'

export default (app) => {
    app.get('/', reactServer);
    app.post('/register-device', registerDevice);
};