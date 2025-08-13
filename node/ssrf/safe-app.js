// Fixed SSRF with URL validation and allowlist

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { URL } = require('url');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Allowlist of safe domains
const ALLOWED_HOSTS = ['example.com', 'www.example.com'];

app.get('/', (req, res) => {
  res.send(`
    <h2>Fetch URL Content (Safe)</h2>
    <form method="POST" action="/fetch">
      <input type="text" name="targetUrl" placeholder="https://example.com" style="width:300px">
      <button type="submit">Fetch</button>
    </form>
  `);
});

app.post('/fetch', async (req, res) => {
  try {
    const targetUrl = new URL(req.body.targetUrl);

    // ✅ Allowlist check
    if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
      return res.status(403).send('Blocked: Host not allowed');
    }

    const response = await axios.get(targetUrl.href);
    res.send(`<pre>${response.data}</pre>`);
  } catch (error) {
    res.status(400).send(`Invalid or blocked URL`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Safe SSRF app running on http://localhost:${PORT}`);
});
