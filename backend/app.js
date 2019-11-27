require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const bagTemplatesRouter = require('./routes/bags');

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

app.use('/', indexRouter);
app.use('/bag_templates', bagTemplatesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
