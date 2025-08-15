// NoSQL Injection (CWE-943) — Vulnerable version
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const PORT = 3009;

app.use(bodyParser.json());

let db, users;

async function initDB() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db('appdb');
  users = db.collection('users');

  // Seed demo users (passwords in clear for simplicity)
  await users.deleteMany({});
  await users.insertMany([
    { username: 'alice', password: 'alice123', role: 'user' },
    { username: 'bob',   password: 'bob123',   role: 'admin' },
  ]);

  console.log('🚀 In-memory MongoDB ready at', uri);
}

app.post('/login', async (req, res) => {
  try {
    // ❌ VULNERABLE: directly uses client JSON as query.
    // Example bypass:
    // { "username": { "$ne": null }, "password": { "$ne": null } }
    const doc = await users.findOne(req.body);
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
    `Vulnerable NoSQL login on :${PORT}
POST /login with JSON body, e.g.:
{"username":"alice","password":"alice123"}

Bypass example:
{"username":{"$ne":null},"password":{"$ne":null}}`
  );
});

initDB().then(() => {
  app.listen(PORT, () => console.log(`🚨 Vulnerable NoSQLi app on http://localhost:${PORT}`));
});
