const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.send(`
    <h2>Ping a Host</h2>
    <form method="POST" action="/ping">
      <input type="text" name="host" placeholder="example.com">
      <button type="submit">Ping</button>
    </form>
  `);
});

app.post('/ping', (req, res) => {
  const host = req.body.host;
  exec(`ping ${host}`, (error, stdout, stderr) => {
    if (error) {
      res.send(`<pre>Error:\n${stderr}</pre>`);
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
