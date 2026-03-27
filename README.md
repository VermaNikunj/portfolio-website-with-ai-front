# Portfolio Website with AI (Frontend)

A personal portfolio website built with HTML, CSS, and JavaScript, integrated with the Gemini AI API via a Spring Boot backend. It highlights work, skills, and achievements in a clean, user-friendly layout. The site is fully responsive and designed for a seamless browsing experience across devices.

## Features

- **AI Chatbot** — Powered by Gemini AI, answers questions about experience, skills, and projects.
- **Multi-language Support** — English, Spanish, French, and German via `language/` JSON files (`en.json`, `es.json`, `fr.json`, `ge.json`)
- **Theme Toggle** — Light and dark theme with preference saved in `localStorage`
- **Download CV** — Direct resume download button
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Component-based Architecture** — Each section is a standalone HTML + JS component loaded dynamically

## Sections

- Home / Header
- About
- Skills
- Experience
- Certificates
- Projects
- Education
- Contact

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES Modules)
- **AI Integration:** Google Gemini AI API (via backend)
- **Backend:** Spring Boot (separate repository)
- **Icons:** Font Awesome 6
- **Internationalization:** Custom i18n using `data-i18n` attributes and JSON language files

## Project Structure

```
portfolio-website-with-ai-front/
├── assets/
│   ├── certificate/        # Certificate PDF files
│   ├── images/             # Background and profile images
│   └── resume/             # Resume PDF
├── components/
│   ├── about/
│   ├── certificate/
│   ├── chatbot/            # AI Chatbot component
│   ├── contact/
│   ├── education/
│   ├── experience/
│   ├── header/
│   ├── navigation/
│   ├── projects/
│   └── skills/
├── language/
│   ├── en.json             # English
│   ├── es.json             # Spanish
│   ├── fr.json             # French
│   └── ge.json             # German
├── utils/
│   ├── alert.js            # Notification utility
│   └── imports.js          # Dynamic component imports
├── index.html
├── main.js
├── style.css
└── README.md
```

## Backend

The chatbot feature requires the backend service to be running:
- Repository: [portfolio-website-with-ai-back](https://github.com/VermaNikunj/portfolio-website-with-ai-back)
- Deployed on: Render
