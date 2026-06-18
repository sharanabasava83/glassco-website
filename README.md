# Glass Co. Website

A modern, responsive website for Glass Co. with a Node.js backend, SQLite database, and contact management system.

## 🌐 Live Website

**Visit the live site:** [`https://glassco-website.onrender.com`](https://glassco-website.onrender.com)

## 📋 Features

- ✅ Responsive multi-page website
- ✅ Contact form with backend API
- ✅ SQLite database for contact management
- ✅ Express.js backend server
- ✅ Modern UI with CSS styling
- ✅ Service listings and company information
- ✅ Contact request storage and retrieval

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Hosting:** Render (Free tier)
- **Version Control:** Git & GitHub

## 📦 Project Structure

```
glassCo/
├── index.html              # Homepage
├── server.js               # Express backend server
├── package.json            # Node dependencies
├── data/                   # SQLite database directory
│   └── contacts.db        # Contact database
├── pages/                  # HTML pages
│   ├── about.html         # About page
│   ├── contact.html       # Contact form page
│   └── services.html      # Services page
├── css/                    # Stylesheets
│   └── style.css          # Main styles
├── js/                     # JavaScript files
│   └── main.js            # Frontend scripts
└── images/                # Image assets
```

## 🚀 Installation & Setup

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sharanabasava83/glassco-website.git
   cd glassco-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`

4. **Open in browser:**
   - Homepage: `http://localhost:3000`
   - Contact form: `http://localhost:3000/pages/contact.html`

### Development with auto-reload

```bash
npm run dev
```
(Uses Nodemon for automatic server restart on file changes)

## 📝 API Endpoints

### POST `/api/contact`
Submit a contact form.

**Request body:**
```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "service": "Installation",
  "budget": "$5000",
  "message": "I'm interested in your services"
}
```

**Response:**
```json
{
  "message": "Contact request saved.",
  "id": 1
}
```

### GET `/api/contacts`
Retrieve all saved contact requests.

**Response:**
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "service": "Installation",
    "budget": "$5000",
    "message": "I'm interested in your services",
    "created_at": "2026-06-16 12:30:45"
  }
]
```

## 🎨 Pages

- **Homepage** (`/`) - Main landing page
- **About** (`/pages/about.html`) - Company information
- **Services** (`/pages/services.html`) - Service offerings
- **Contact** (`/pages/contact.html`) - Contact form with backend integration

## 🗄️ Database

The app uses SQLite for data persistence. The database file is stored in the `data/` directory and contains:

- **contacts table:** Stores all contact form submissions with timestamps

## 🚢 Deployment

### Render (Current Hosting)

The app is currently deployed on [Render's free tier](https://render.com).

- **Live URL:** `https://glassco-website.onrender.com`
- **Service:** Web Service (Node.js)
- **Auto-deploys:** from main branch on GitHub push

### Deploying Your Own

1. Sign up at [Render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Deploy!

## 📊 Generated Reports

The project includes Python scripts for generating project reports:

- `generate_report.py` - Generates Excel report
- `generate_report_pdf.py` - Generates PDF report

Run with:
```bash
python generate_report.py
python generate_report_pdf.py
```

## 🔗 Links

- **GitHub Repository:** [`https://github.com/sharanabasava83/glassco-website`](https://github.com/sharanabasava83/glassco-website)
- **Live Website:** [`https://glassco-website.onrender.com`](https://glassco-website.onrender.com)

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Sharanabasava**

## 💡 Notes

- The free Render tier may take up to 50 seconds to spin up after inactivity
- SQLite database persists per Render instance
- For production use, consider upgrading to a paid Render tier for better performance

---

**Ready to use!** Start by visiting the [live website](https://glassco-website.onrender.com) or cloning the repo for local development.
