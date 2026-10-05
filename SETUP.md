# Orbitly Website - Setup Instructions

## Form Email Configuration

To receive form submissions to your Gmail account, update the following files:

### 1. Contact Form (`js/main.js`)
Replace `YOUR_EMAIL@gmail.com` on line ~60 with your actual Gmail address.

### 2. Trial Form (`js/trial.js`)
Replace `YOUR_EMAIL@gmail.com` on line ~17 with your actual Gmail address.

### 3. Auth Forms (`js/auth.js`)
Replace `YOUR_EMAIL@gmail.com` on lines ~47, ~92, and ~137 with your actual Gmail address.

## How to Set Up FormSubmit

FormSubmit.co is a free service that sends form submissions to your email:

1. Replace `YOUR_EMAIL@gmail.com` in the three files above with your real Gmail
2. Submit a test form on your site
3. Check your email for a confirmation from FormSubmit
4. Click the confirmation link to activate the endpoint
5. Future submissions will arrive in your inbox automatically

## Alternative: Use Your Own Backend

If you prefer to handle forms with your own server:
- Remove the FormSubmit fetch calls
- Replace with your own API endpoint
- The form data is already structured in the `formData` objects

## Demo Video

The YouTube embed on the home page uses a placeholder video ID (`dQw4w9WgXcQ`).
Replace it with your actual Orbitly demo video ID in `index.html` line ~320.

## Pages Created

- **trial.html** - Free trial signup page
- **auth.html** - Combined login/registration page

All navigation links have been updated to point to these new pages.

## Security Notes

- Passwords are NOT sent to FormSubmit (replaced with `••••••••`)
- All form submissions include timestamps
- Forms work in demo mode even without email configuration (logs to console)

---

**Ready to launch!** Just update the email addresses and you're good to go.
