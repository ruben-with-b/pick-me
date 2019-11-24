require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

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
app.use('/users', usersRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TEST-CONNECTION-TO-DB--------------------------------------------------------
// const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
//     `@${process.env.DB_HOST}/test?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {useNewUrlParser: true});
// client.connect().then(() => {
//   return client.db('sample_airbnb').collection('listingsAndReviews')
//       .find().toArray();
// }).then((listingsAndReviews) => {
//   console.log(listingsAndReviews);
// }).finally(() => {
//   client.close();
// });
// -----------------------------------------------------------------------------

module.exports = app;
