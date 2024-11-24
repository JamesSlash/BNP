import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

// Initialize SQLite database in memory
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the in-memory SQLite database.');
    initializeDatabase();
  }
});

// Create tables and insert admin user
function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS simulations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount INTEGER NOT NULL,
        term INTEGER NOT NULL,
        income INTEGER NOT NULL,
        employment TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        monthly_payment REAL NOT NULL,
        vehicle_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    db.run(`
      INSERT OR IGNORE INTO admins (username, password)
      VALUES ('admin', 'admin123')
    `, [], (err) => {
      if (err) {
        console.error('Error creating admin account:', err);
      } else {
        console.log('Default admin account created');
      }
    });
  });
}

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/simulate', (req, res) => {
  const {
    amount,
    term,
    income,
    employment,
    name,
    email,
    phone,
    monthlyPayment,
    vehicleId
  } = req.body;

  db.run(`
    INSERT INTO simulations (amount, term, income, employment, name, email, phone, monthly_payment, vehicle_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [amount, term, income, employment, name, email, phone, monthlyPayment, vehicleId], (err) => {
    if (err) {
      console.error('Error saving simulation:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Simulation saved successfully' });
    }
  });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM admins WHERE username = ? AND password = ?', [username, password], (err, admin) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
});

app.get('/api/admin/simulations', authenticateToken, (req, res) => {
  db.all('SELECT * FROM simulations ORDER BY created_at DESC', [], (err, simulations) => {
    if (err) {
      console.error('Error fetching simulations:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(simulations);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});