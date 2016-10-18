const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>首頁</h1>');
});

app.get('/api/query', (req, res) => {
  res.json(req.query);
});

app.post('/api/body', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.get('/api/users/:id', (req, res, next) => {
  if (req.params.id === '1') {
    res.json({
      'id': 1,
      'name': 'Joe',
      'age': 18
    });
  } else if (req.params.id === '2') {
    res.json({
      'id': 2,
      'name': 'John',
      'age': 22
    });
  } else next();
});

app.use((req, res) => {
  res.status(404).send('<h1>404: Page Not Found</h1>');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});