const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ✅ Whitelisted domains
const allowedHosts = ['example.com', 'google.com'];

app.get('/', (req, res) => {
  res.send(`
    <h2>Resolve a Whitelisted Hostname</h2>
    <form method="POST" action="/resolve">
      <input type="text" name="host" placeholder="example.com">
      <button type="submit">Resolve</button>
    </form>
    <p>Allowed hosts: ${allowedHosts.join(', ')}</p>
  `);
});

app.post('/resolve', (req, res) => {
  const host = req.body.host;

  // ✅ Only allow whitelisted domains
  if (!allowedHosts.includes(host)) {
    return res.send('❌ Host not allowed.');
  }

  dns.lookup(host, (err, address) => {
    if (err) {
      res.send(`❌ DNS lookup failed: ${err.message}`);
    } else {
      res.send(`<pre>Resolved IP for ${host}: ${address}</pre>`);
    }
  });
});

app.listen(port, () => {
  console.log(`🔐 Whitelist-safe app running at http://localhost:${port}`);
});
