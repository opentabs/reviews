const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');

// Connect to database
const db = require('../database/index');

// Test db connection
// db.authenticate()
//   .then(() => console.log('Connection successful'))
//   .catch(err => console.log('Database connection error: ' + err));

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(morgan('tiny'));

// const sql = 'INSERT INTO Test (v1, v2, v3) VALUES ?';
// const values = [[]]; // bring in seeded data here
// connection.query(sql, [values], (err) => {
//   if (err) throw err;
//   connection.end();
// });

app.get('/', (req, res) => res.status(200).send('Welcome to the beginning of nothingness.'));
// to see this, go to http://localhost:3000/

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
