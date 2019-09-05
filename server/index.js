const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.disable('etag');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));


app.get('/api/images/:listingid', (req, res) => {
  axios.get(`http://localhost:5000/api/images/${req.params.listingid}`)
  .then((data) => {
    res.status(200).send(data.data)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

app.get('/api/reservation/search/:id', (req, res) => {
  axios.get(`http://localhost:5001/api/reservation/search/${req.params.id}`)
  .then((data) => {
    res.status(200).send({ listing: data.data.listing[0], booking: data.data.booking });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`Proxy server listening on port ${port}!`)});