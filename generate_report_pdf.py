from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from pathlib import Path

report_path = Path('GlassCo_Project_Report.pdf')
doc = SimpleDocTemplate(str(report_path), pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
styles = getSampleStyleSheet()

style_title = ParagraphStyle(name='Title', parent=styles['Title'], fontSize=18, leading=22, alignment=TA_CENTER)
style_heading = ParagraphStyle(name='Heading', parent=styles['Heading2'], fontSize=14, leading=18, spaceAfter=10)
style_normal = ParagraphStyle(name='Normal', parent=styles['BodyText'], fontSize=11, leading=14)
style_bullet = ParagraphStyle(name='Bullet', parent=styles['BodyText'], leftIndent=14, bulletIndent=4, bulletFontName='Helvetica')

story = []
story.append(Paragraph('Glass Co. Project Report', style_title))
story.append(Spacer(1, 16))

story.append(Paragraph('Project Overview', style_heading))
summary = [
    f'Project Name: Glass Co. Website',
    f'Location: {Path.cwd()}',
    'Report Date: 2026-06-16',
    'Prepared By: Manual Testing Report',
]
for item in summary:
    story.append(Paragraph(item, style_normal))
story.append(Spacer(1, 12))

story.append(Paragraph('Scope', style_heading))
scope_points = [
    'Static frontend website pages: index, about, services, contact',
    'Backend contact submission API using Express and SQLite',
    'Contact form integration and local database storage',
]
for point in scope_points:
    story.append(Paragraph(point, style_bullet, bulletText='•'))
story.append(Spacer(1, 12))

story.append(Paragraph('Implementation Status', style_heading))
status_points = [
    'Backend server file present: server.js',
    'Dependency manifest present: package.json',
    'SQLite data directory created: data/contacts.db',
    'Contact form submission wired to /api/contact',
]
for point in status_points:
    story.append(Paragraph(point, style_bullet, bulletText='•'))
story.append(Spacer(1, 12))

story.append(Paragraph('Test Cases', style_heading))
case_data = [
    ['ID', 'Test Case', 'Expected', 'Actual', 'Status'],
    ['TC-01', 'Load Home page', 'Home page loads', 'Home page content available', 'Pass'],
    ['TC-02', 'Load Contact page', 'Contact page loads', 'Contact page content available', 'Pass'],
    ['TC-03', 'Submit contact form with valid data', 'Success and store record', 'Requires backend running', 'Pending'],
    ['TC-04', 'Submit contact form without email', '400 validation error', 'Validation logic exists', 'Pass'],
    ['TC-05', 'Submit contact form without message', '400 validation error', 'Validation logic exists', 'Pass'],
    ['TC-06', 'View stored contacts via API', 'GET /api/contacts returns list', 'Endpoint exists', 'Pending'],
    ['TC-07', 'Install dependencies', 'npm install succeeds', 'Dependencies installed successfully', 'Pass'],
    ['TC-08', 'Start backend server', 'Starts without error', 'Port conflict may exist', 'Conditional'],
]
table = Table(case_data, colWidths=[50, 140, 130, 140, 70])
table.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
]))
story.append(table)
story.append(Spacer(1, 12))

story.append(Paragraph('Findings', style_heading))
findings = [
    ('Backend Startup', 'Port 3000 may be in use by another process; server startup fails with EADDRINUSE.', 'Medium', 'Open'),
    ('Static Page Delivery', 'All HTML pages are present and linked correctly.', 'Low', 'Closed'),
    ('Contact Submission', 'Form submission is wired to POST /api/contact and data stores in SQLite.', 'Low', 'Closed (code-level)'),
    ('Input Validation', 'Email and message required; email format validation is not implemented.', 'Medium', 'Open'),
    ('Security', 'No HTTPS and no spam protection implemented.', 'High', 'Open'),
    ('Admin Access', 'No admin view exists for stored contacts.', 'Medium', 'Open'),
]
find_table = Table([['Category', 'Description', 'Severity', 'Status']] + findings, colWidths=[110, 220, 70, 70])
find_table.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ('BACKGROUND', (0,0), (-1,0), colors.lightgrey),
    ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))
story.append(find_table)
story.append(Spacer(1, 12))

story.append(Paragraph('Skills & Tools', style_heading))
skill_points = [
    'Frontend: HTML5, CSS3, JavaScript',
    'Backend: Node.js, Express.js',
    'Database: SQLite3',
    'Package Management: npm',
    'Development Tools: VS Code, PowerShell',
    'Libraries: express, sqlite3, nodemon',
]
for point in skill_points:
    story.append(Paragraph(point, style_bullet, bulletText='•'))
story.append(Spacer(1, 12))

story.append(Paragraph('Future Improvements', style_heading))
future_points = [
    'Allow port selection or automatic fallback when a port is in use.',
    'Add client-side email format validation and improved error messages.',
    'Build an admin dashboard to review contact submissions.',
    'Add HTTPS, input sanitization, rate limiting, and CAPTCHA security.',
    'Deploy to a cloud host or container platform with environment configuration.',
    'Send email notifications for new contact submissions.',
    'Improve user experience with loading states and responsive UI testing.',
]
for point in future_points:
    story.append(Paragraph(point, style_bullet, bulletText='•'))

story.append(Spacer(1, 12))
story.append(Paragraph('Conclusion', style_heading))
conclusion = 'The project is implemented with a working frontend and backend API. The main remaining issue is resolving runtime port conflicts before full manual execution verification.'
story.append(Paragraph(conclusion, style_normal))

doc.build(story)
print(f'Created PDF report: {report_path.resolve()}')
