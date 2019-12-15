// Load environment variables
require('dotenv').config();

// Auto-generated-at-express-setup---------------------------------------------
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ----------------------------------------------------------------------------

const NotificationScheduler =
  require('./libs/pickme/logic/NotificationScheduler');
// Import routes
const bagTemplatesRouter = require('./routes/bagTemplates');
const bagsRouter = require('./routes/bags');
// Import modules relevant for api-documentation.
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load('./backend/swagger.yaml');

// Enable deploying the frontend and backend with two different ports at the
// same machine.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Pass to next layer of middleware
  next();
});

// Add routes.
app.use('/bag_templates', bagTemplatesRouter);
app.use('/my_bags', bagsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Init notifications.
NotificationScheduler.init().then(() => {
  console.log('Notification scheduler successfully initialized');
}).catch((e) => {
  console.error(e);
});

module.exports = app;
