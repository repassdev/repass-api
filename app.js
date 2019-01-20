const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3000;
const databaseURI = 'mongodb://admin:repass123@ds125073.mlab.com:25073/repass_dev';

app.use(cors());
mongoose.connect(databaseURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if(err){
    console.log(`Database error: ${err}`);
  }else{
    console.log('Connected to database.');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  return res.json('Repass');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  }
);