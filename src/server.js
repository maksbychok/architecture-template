require('dotenv/config')
require('module-alias/register');
const validateEnv = require('./app/utils/ValidateEnv');
const App = require('./app/app');
const apiModule = require('./app/api/Api.module');

validateEnv();
const app = new App([apiModule], process.env.PORT);
app.listen();
