# Orbitly - Node.js Backend Setup

## Installation

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Version 16 or higher recommended

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Server

**Development mode (auto-restart on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at: **http://localhost:3000**

## Features

### Backend API
- **Express.js** web server
- **SQLite** database (file-based, no setup needed)
- **Session-based** authentication for admin
- Form submission storage and management

### Database Tables
- `contacts` - Contact form submissions
- `trial_signups` - Free trial signups
- `registrations` - User registrations
- `admins` - Admin login credentials

### API Endpoints

**Public:**
- `POST /api/contact` - Submit contact form
- `POST /api/trial` - Submit trial signup
- `POST /api/register` - Submit registration

**Admin (requires login):**
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/api/contacts` - Get all contacts
- `GET /admin/api/trials` - Get all trial signups
- `GET /admin/api/registrations` - Get all registrations
- `DELETE /admin/api/contacts/:id` - Delete a contact

### Admin Panel

Access at: **http://localhost:3000/admin/login**

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**Features:**
- View all form submissions in organized tables
- Real-time stats (total contacts, trials, registrations)
- Delete contact submissions
- Tab-based interface
- Dark mode support
- Auto-refresh every 30 seconds

## File Structure

```
orbitly-site/
├── server.js                  # Express server + API routes
├── database.db                # SQLite database (auto-created)
├── package.json               # Node.js dependencies
├── admin-login.html           # Admin login page
├── admin-dashboard.html       # Admin dashboard
├── index.html                 # Public pages...
├── css/                       # Stylesheets
└── js/                        # Client-side JavaScript
```

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change admin password:**
   - The default `admin/admin123` is for development only
   - Update in the database or modify `server.js` line 51

2. **Add HTTPS:**
   - Use a reverse proxy like Nginx
   - Or add SSL certificates to Express

3. **Environment variables:**
   - Move secrets to `.env` file
   - Use `dotenv` package

4. **Session security:**
   - Change the session secret in `server.js` line 65
   - Use secure cookies in production

5. **Rate limiting:**
   - Add express-rate-limit for form endpoints
   - Prevents spam/abuse

## Deployment

### Deploy to Heroku:
```bash
heroku create orbitly-app
git push heroku main
```

### Deploy to Vercel/Netlify:
Use the serverless function adapter or deploy to a VPS instead.

### Deploy to VPS (DigitalOcean, AWS, etc.):
```bash
# Install Node.js on server
# Clone repo
npm install
npm start
# Use PM2 for process management:
npm install -g pm2
pm2 start server.js --name orbitly
pm2 startup
pm2 save
```

## Database Backup

The SQLite database is stored in `database.db`. To backup:
```bash
cp database.db database-backup-$(date +%Y%m%d).db
```

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in server.js or set environment variable:
PORT=4000 npm start
```

**Database locked error:**
- Close any SQLite browser/viewer
- Restart the server

**Admin login not working:**
- Check browser console for errors
- Verify session middleware is working
- Clear browser cookies

## Next Steps

- [ ] Change default admin password
- [ ] Set up email notifications for new submissions
- [ ] Add pagination to admin tables
- [ ] Implement user authentication (not just admin)
- [ ] Add form spam protection (reCAPTCHA)
- [ ] Set up automated database backups

---

**Server running!** 🚀
Visit: http://localhost:3000
Admin: http://localhost:3000/admin/login
