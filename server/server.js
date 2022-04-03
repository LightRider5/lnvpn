const express = require('express');
const app = express();

app.use(express.static('public'))
app.listen(5000, () => {
  console.log('listening on 5000');
});

/*
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/public/index.html`);
});*/