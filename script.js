const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const users = []; // In-memory storage for simplicity. Use MongoDB for real data.

// Register Route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.send('User registered!');
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.send('Invalid credentials');
  }
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};

// Protected route for surveys
app.get('/surveys', authenticateJWT, (req, res) => {
  res.send('Welcome to the surveys section');
});

app.listen(3000, () => console.log('Server running on port 3000'));
