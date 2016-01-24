import env from 'node-env-file';

if (!process.env.DATABASE_URL) {
    env(__dirname + '/.env');
}