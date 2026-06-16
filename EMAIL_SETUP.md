# Email Notification Setup

The Glass Co. website now sends email notifications when someone submits a contact form. Follow these steps to enable email notifications.

## Configuration

### Step 1: Set Up Gmail App Password

To send emails via Gmail, you need to create an **App Password** (more secure than your regular password):

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Scroll down to **How you sign in to Google**
4. Make sure **2-Step Verification** is enabled
5. Scroll back up and click **App passwords** (this only appears if 2-Step Verification is on)
6. Select **Mail** and **Windows Computer** (or your device type)
7. Google will generate a 16-character password - copy it (you'll need this)

### Step 2: Add Environment Variables to Render

1. Go to your Render dashboard: https://dashboard.render.com/
2. Click on your **glassco-website** service
3. Click the **Settings** tab
4. Scroll to **Environment** section
5. Click **Add Environment Variable** and add these two variables:

| Variable Name | Value |
|---|---|
| `EMAIL_USER` | Your Gmail address (e.g., `your-email@gmail.com`) |
| `EMAIL_PASS` | The 16-character app password you generated (paste it as-is) |

6. Click **Save Changes** - Render will automatically restart your service

### Step 3: Verify It's Working

1. Go to your website: https://glassco-website.onrender.com
2. Fill out the contact form and submit
3. Check sharanurs05@gmail.com for the email notification
4. You should receive the message within a few seconds

## How It Works

- When someone fills out the contact form on your website, the server saves it to the SQLite database
- Simultaneously, an email is sent to **sharanurs05@gmail.com** with all the contact details
- The email includes: name, email address, company, service requested, budget, and message
- You get instant notifications without needing to check the admin dashboard

## Troubleshooting

### Emails not sending?

1. **Check Render logs**: Go to Dashboard → Your Service → Logs tab
2. **Verify credentials**: Make sure EMAIL_USER and EMAIL_PASS are correct
3. **Enable Less Secure Apps**: If using a regular Gmail password (not app password), enable "Less secure app access" on your Google Account
4. **Wait for restart**: After setting environment variables, Render takes ~1-2 minutes to restart

### Still not working?

- Gmail app password is **case-sensitive** - make sure you copied it exactly
- The password has **spaces** - paste all 16 characters as provided by Google
- Your Gmail account must have **2-Step Verification** enabled

## Changing the Admin Email

To send notifications to a different email address, edit `server.js` and change:

```javascript
const ADMIN_EMAIL = 'sharanurs05@gmail.com'; // Change this to your email
```

Then commit and push to GitHub - Render will auto-deploy.

## Local Testing

To test locally with your own SMTP credentials:

1. Create a `.env` file in your project root:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. Update `server.js` to load environment variables:
```javascript
require('dotenv').config();
```

3. Install dotenv:
```bash
npm install dotenv
```

4. Add to `.gitignore`:
```
.env
```

## Security Notes

- **Never commit** `EMAIL_PASS` or any credentials to GitHub
- App passwords are **more secure** than your main password
- Environment variables on Render are **encrypted** at rest
- Each app password is **unique** and can be revoked if needed
