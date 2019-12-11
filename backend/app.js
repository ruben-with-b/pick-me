require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const bagTemplatesRouter = require('./routes/bagTemplates');
const bagsRouter = require('./routes/bags');

const NotificationScheduler =
  require('./libs/pickme/logic/NotificationScheduler');

// import swagger
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load('./backend/swagger.yaml');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/bag_templates', bagTemplatesRouter);
app.use('/my_bags', bagsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

NotificationScheduler.init().then(() => {
  console.log('Notification scheduler successfully initialized');
}).catch((e) => {
  console.error(e);
});

module.exports = app;
