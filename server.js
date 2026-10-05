const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Create tables
function initDatabase() {
    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS trial_signups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            plan TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (!err) {
            // Insert default admin (username: admin, password: admin123)
            db.run(`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`,
                ['admin', 'admin123']);
        }
    });
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'orbitly-secret-key-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// Routes - Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/features', (req, res) => {
    res.sendFile(path.join(__dirname, 'features.html'));
});

app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/trial', (req, res) => {
    res.sendFile(path.join(__dirname, 'trial.html'));
});

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth.html'));
});

// API Routes
app.post('/api/contact', (req, res) => {
    console.log('📧 Contact form submission received:', req.body);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    db.run(
        `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`,
        [name, email, subject, message],
        function(err) {
            if (err) {
                console.error('❌ Error inserting contact:', err.message);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            console.log('✅ Contact saved successfully, ID:', this.lastID);
            res.json({ success: true, message: 'Contact form submitted successfully', id: this.lastID });
        }
    );
});

app.post('/api/trial', (req, res) => {
    console.log('🚀 Trial signup received:', req.body);
    const { fullname, email, company, plan } = req.body;

    if (!fullname || !email || !plan) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    db.run(
        `INSERT INTO trial_signups (fullname, email, company, plan) VALUES (?, ?, ?, ?)`,
        [fullname, email, company || '', plan],
        function(err) {
            if (err) {
                console.error('❌ Error inserting trial:', err.message);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            console.log('✅ Trial signup saved successfully, ID:', this.lastID);
            res.json({ success: true, message: 'Trial signup successful', id: this.lastID });
        }
    );
});

app.post('/api/register', (req, res) => {
    console.log('👤 Registration received:', req.body);
    const { fullname, email, company } = req.body;

    if (!fullname || !email) {
        console.log('❌ Missing required fields');
        return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    db.run(
        `INSERT INTO registrations (fullname, email, company) VALUES (?, ?, ?)`,
        [fullname, email, company || ''],
        function(err) {
            if (err) {
                console.error('❌ Error inserting registration:', err.message);
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            console.log('✅ Registration saved successfully, ID:', this.lastID);
            res.json({ success: true, message: 'Registration successful', id: this.lastID });
        }
    );
});

// Admin routes
app.get('/admin/login', (req, res) => {
    if (req.session.isAdmin) {
        return res.redirect('/admin/dashboard');
    }
    res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    db.get(
        `SELECT * FROM admins WHERE username = ? AND password = ?`,
        [username, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }
            if (row) {
                req.session.isAdmin = true;
                req.session.username = username;
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        }
    );
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

app.get('/admin/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

app.get('/admin/api/contacts', requireAuth, (req, res) => {
    db.all(`SELECT * FROM contacts ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, data: rows });
    });
});

app.get('/admin/api/trials', requireAuth, (req, res) => {
    db.all(`SELECT * FROM trial_signups ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, data: rows });
    });
});

app.get('/admin/api/registrations', requireAuth, (req, res) => {
    db.all(`SELECT * FROM registrations ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, data: rows });
    });
});

app.delete('/admin/api/contacts/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.json({ success: true, message: 'Contact deleted' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Orbitly server running at http://localhost:${PORT}`);
    console.log(`📊 Admin panel at http://localhost:${PORT}/admin/login`);
    console.log(`   Default credentials: admin / admin123\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('\nDatabase connection closed');
        }
        process.exit(0);
    });
});
