# Deploy Orbitly to the Internet

Your site needs to be hosted so external people can access it. Here are your options:

## Option 1: Render.com (Easiest - FREE)

**Best for:** Quick deployment with database support

### Steps:

1. **Create a Render account**: https://render.com/
2. **Push your code to GitHub**:
   ```powershell
   git init
   git add .
   git commit -m "Initial Orbitly site"
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/orbitly-site.git
   git push -u origin main
   ```

3. **Create a new Web Service on Render**:
   - Connect your GitHub repo
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Click "Create Web Service"

4. **Your site will be live at**: `https://orbitly-site.onrender.com` (or custom domain)

**Pros:** Free tier, handles SQLite, automatic deployments
**Cons:** Spins down after inactivity (takes 30s to wake up)

---

## Option 2: Railway.app (Easiest - $5/month)

**Best for:** Always-on hosting with minimal setup

### Steps:

1. **Create Railway account**: https://railway.app/
2. **Push code to GitHub** (same as above)
3. **Click "New Project" → Deploy from GitHub**
4. **Railway auto-detects Node.js** and deploys
5. **Add a domain** in settings

**Pros:** Fast, reliable, always-on, $5/month credit included
**Cons:** Paid after free credit

---

## Option 3: Vercel (FREE but requires changes)

**Best for:** Static hosting (you'll need a different database setup)

⚠️ **Note:** Vercel doesn't support SQLite - you'd need to switch to:
- PostgreSQL (Vercel Postgres)
- MongoDB (MongoDB Atlas)
- Supabase (PostgreSQL)

Not recommended unless you want to refactor the database.

---

## Option 4: DigitalOcean / AWS / Linode (VPS - $5-12/month)

**Best for:** Full control, production-ready

### Steps:

1. **Create a VPS** (Ubuntu 22.04 recommended)
2. **SSH into server**:
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone your repo**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/orbitly-site.git
   cd orbitly-site
   npm install
   ```

5. **Install PM2** (keeps server running):
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name orbitly
   pm2 startup
   pm2 save
   ```

6. **Set up Nginx** (reverse proxy):
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/orbitly
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable:
   ```bash
   sudo ln -s /etc/nginx/sites-available/orbitly /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Add SSL with Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Pros:** Full control, fast, production-ready
**Cons:** More setup, need to manage server

---

## Option 5: ngrok (Temporary Testing - FREE)

**Best for:** Quick sharing for testing (NOT permanent)

### Steps:

1. **Download ngrok**: https://ngrok.com/download
2. **Run your server**: `npm start`
3. **In another terminal**:
   ```powershell
   ngrok http 3000
   ```
4. **Share the URL**: `https://abc123.ngrok-free.app`

⚠️ **Temporary:** URL changes when you restart ngrok, free tier has limits

---

## Recommended Path

**For quick testing/demo:** Use **ngrok** (5 minutes)

**For real deployment:** Use **Render.com** (15 minutes, free)

**For production:** Use **Railway** or **DigitalOcean VPS**

---

## Before Going Live

✅ **Change admin password** in `server.js` or via database
✅ **Set up environment variables** for secrets
✅ **Enable HTTPS** (most platforms do this automatically)
✅ **Update CORS settings** if needed
✅ **Add rate limiting** to prevent spam
✅ **Set up database backups**

---

## Quick Start: Deploy with Render Now

```powershell
# 1. Initialize git
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
# (Do this on github.com first, then:)
git remote add origin https://github.com/YOUR_USERNAME/orbitly-site.git
git push -u origin main

# 3. Go to render.com, connect repo, done!
```

Need help with any of these? Let me know which option you want to use!
