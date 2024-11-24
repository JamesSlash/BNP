import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Define interfaces for type safety
interface SimulationData {
  amount: number;
  term: number;
  income: number;
  employment: string;
  name: string;
  email: string;
  phone: string;
  monthlyPayment: number;
  vehicleId: string;
}

interface AdminUser {
  id: number;
  username: string;
}

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: AdminUser;
    }
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as AdminUser;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Simulation route
app.post('/api/simulate', (req: Request<{}, {}, SimulationData>, res: Response) => {
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

  console.log('Received simulation data:', {
    amount,
    term,
    income,
    employment,
    name,
    email,
    phone,
    monthlyPayment,
    vehicleId
  });

  db.run(`
    INSERT INTO simulations (amount, term, income, employment, name, email, phone, monthly_payment, vehicle_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [amount, term, income, employment, name, email, phone, monthlyPayment, vehicleId], (err) => {
    if (err) {
      console.error('Error saving simulation:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Simulation saved successfully');
      res.status(201).json({ message: 'Simulation saved successfully' });
    }
  });
});

// Login route
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM admins WHERE username = ? AND password = ?',
    [username, password],
    (err, admin: AdminUser | undefined) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1h' }
      );

      res.json({ token });
    }
  );
});

// Protected route for simulations
app.get('/api/admin/simulations', authMiddleware, (req: Request, res: Response) => {
  db.all('SELECT * FROM simulations ORDER BY created_at DESC', (err, simulations) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(simulations);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handle shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});