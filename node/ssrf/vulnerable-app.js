// CWE-918: Server-Side Request Forgery (SSRF)

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Fetch URL Content</h2>
    <form method="POST" action="/fetch">
      <input type="text" name="targetUrl" placeholder="https://example.com" style="width:300px">
      <button type="submit">Fetch</button>
    </form>
  `);
});

app.post('/fetch', async (req, res) => {
  const { targetUrl } = req.body;
  try {
    const response = await axios.get(targetUrl); // ❌ No validation
    res.send(`<pre>${response.data}</pre>`);
  } catch (error) {
    res.status(500).send(`Error fetching: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Vulnerable SSRF app running on http://localhost:${PORT}`);
});
