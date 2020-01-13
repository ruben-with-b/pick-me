'use strict';

// Load environment variables
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
/* Enable CORS for frontend */
app.use(
    cors({
      origin: true,
      credentials: true,
    }),
);
/* Allow OPTIONS on all resources */
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());

const NotificationScheduler =
  require('./libs/pickme/logic/NotificationScheduler');
// Import routes
const bagTemplatesRouter = require('./routes/bagTemplates');
const bagsRouter = require('./routes/bags');
const usersRouter = require('./routes/users');
// Import modules relevant for api-documentation.
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load('./backend/swagger.yaml');

// Add routes.
app.use('/bag_templates', bagTemplatesRouter);
app.use('/my_bags', bagsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/users', usersRouter);

// Init notifications.
const notificationScheduler = NotificationScheduler.getInstance();
notificationScheduler.on(NotificationScheduler.EVENT_BAG_DUE, (msg) => {
  console.log(msg);
});
notificationScheduler.init().then(() => {
  console.log('Notification scheduler successfully initialized');
}).catch((e) => {
  console.error(e);
});

module.exports = app;
