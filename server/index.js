const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

const app = express();
fetch.Promise = Bluebird;

app.use(morgan('tiny'));
app.use(cors());
app.disable('etag');

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../') + '/client/index.html');
});

app.get('/api/images/:listingid', (req, res) => {
  fetch(`http://localhost:3000/api/images/${req.params.listingid}`)
  .then((data) => {
    console.log(data)
    res.status(200).send(data)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Proxy server listening on port ${port}!`)});