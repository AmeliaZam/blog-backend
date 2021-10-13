const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const allRoutes = require('./routes');
require('./middlewares/passport');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get('env') === 'dev') app.use(morgan('tiny'));

app.use('/api', allRoutes);

module.exports = { app };
