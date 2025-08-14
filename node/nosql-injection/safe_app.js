// NoSQL Injection (CWE-943) — Safe version
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

let db, users;

async function initDB() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('appdb');
  users = db.collection('users');

  await users.deleteMany({});
  await users.insertMany([
    { username: 'alice', password: 'alice123', role: 'user' },
    { username: 'bob',   password: 'bob123',   role: 'admin' },
  ]);

  console.log('🔐 In-memory MongoDB ready at', uri);
}

// simple validator helpers
function isPlainObject(o) {
  return o && typeof o === 'object' && !Array.isArray(o);
}
function isSafeString(s) {
  return typeof s === 'string' && s.length >= 1 && s.length <= 64;
}
function containsOperatorKeys(o) {
  return Object.keys(o).some(k => k.startsWith('$'));
}

app.post('/login', async (req, res) => {
  try {
    const body = req.body;

    // ✅ Strict validation: must be an object with string username/password
    if (!isPlainObject(body) || containsOperatorKeys(body)) {
      return res.status(400).json({ ok: false, msg: 'Invalid payload' });
    }

    const { username, password } = body;
    if (!isSafeString(username) || !isSafeString(password)) {
      return res.status(400).json({ ok: false, msg: 'Invalid credentials format' });
    }

    // ✅ Build query server-side; ignore extra fields
    const query = { username, password };

    const doc = await users.findOne(query);
    if (doc) {
      return res.json({ ok: true, user: { username: doc.username, role: doc.role } });
    }
    return res.status(401).json({ ok: false, msg: 'Invalid credentials' });
  } catch (e) {
    return res.status(400).json({ ok: false, error: e.message });
  }
});

app.get('/', (_req, res) => {
  res.type('text').send(
    `Safe NoSQL login on :${PORT}
POST /login with JSON:
{"username":"alice","password":"alice123"}

Operator keys ($...) are rejected; query is server-built.`
  );
});

initDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Safe NoSQLi app on http://localhost:${PORT}`));
});

