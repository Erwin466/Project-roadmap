# 🚦 Roadmap Learning Platform

![CI](https://github.com/yourusername/roadmap-platform/actions/workflows/ci.yml/badge.svg)
![Lint](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)
![License](https://img.shields.io/github/license/yourusername/roadmap-platform)

A modern, full-stack learning platform featuring a Django backend and a modular JavaScript frontend. This project supports robust authentication, gamification, shop, social features, and a clean, maintainable codebase.

---

## 🌐 Live Demo

Try the platform: [rmplatform-production.up.railway.app](https://rmplatform-production.up.railway.app)

## 🖼️ Screenshots

![Dashboard](docs/screenshots/dashboard.png)
![Shop](docs/screenshots/shop.png)
![Social](docs/screenshots/social.png)

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API & Authentication Usage](#api--authentication-usage)
- [Social Login](#social-login)
- [Global Error Notification](#global-error-notification)
- [Development & Contribution](#development--contribution)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security & Best Practices](#security--best-practices)
- [Documentation](#documentation)
- [Contribution Guidelines](#contribution-guidelines)
- [Roadmap & Future Work](#roadmap--future-work)
- [Technology Stack](#technology-stack)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## Features

- **Django backend** with JWT/cookie authentication, RBAC, gamification, shop, and social APIs.
- **Modern JavaScript frontend** with modular utilities for API, authentication, and error handling.
- **Social login** (Google, GitHub) via OAuth2.
- **Global error notifications** for a user-friendly experience.
- **Extensible, maintainable codebase** with clear separation of concerns.

---

## Project Structure

```
Project-roadmap/
├── Config/
│   └── api.js                # API base URL config
├── Script/
│   ├── auth.js               # Authentication and token management
│   ├── utils.js              # API utility, error notification, helpers
│   ├── social-login.js       # Social login (Google, GitHub)
│   ├── ...                   # Feature scripts (roadmaps, shop, etc.)
├── Page/
│   ├── signin.html
│   ├── signup.html
│   ├── main.html
│   └── ...                   # Other HTML pages
└── ...
```

---

## Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/roadmap-platform.git
cd roadmap-platform
```

### 2. **Install Dependencies**

- **Frontend:**  
  If using npm for linting, formatting, etc.:
  ```sh
  npm install
  ```

- **Backend:**  
  See backend README for Django setup.

### 3. **Configure API Base URL**

The API base URL is set in `Config/api.js`:
```js
export const API_BASE_URL = "https://rmplatform-production.up.railway.app/api/v1/";
```

---

## API & Authentication Usage

All API and authentication logic is handled through modular utilities.

### **API Requests**

Use the unified `apiRequest` utility for all backend communication:

```js
import { apiRequest } from "./Script/utils.js";

// Example: Fetch courses
const courses = await apiRequest("courses/");
```

### **Authentication**

Use the `auth.js` module for login, logout, and token management:

```js
import { login, logout, getTokens, refresh } from "./Script/auth.js";

// Login
await login(email, password);

// Logout
await logout();

// Get tokens (if using JWT in localStorage)
const tokens = getTokens();
```

---

## Social Login

Social login is handled via the `social-login.js` utility:

```js
import { handleSocialLogin } from "./Script/social-login.js";

// Google login button
document.getElementById("google-login").onclick = () => handleSocialLogin("google");

// GitHub login button
document.getElementById("github-login").onclick = () => handleSocialLogin("github");
```

**OAuth errors** (e.g., if the user denies access) can be handled with:

```js
import { checkSocialLoginError } from "./Script/social-login.js";
checkSocialLoginError();
```

---

## Global Error Notification

For a consistent user experience, use the `showGlobalError` utility to display errors at the top of the page:

```js
import { showGlobalError } from "./Script/utils.js";

try {
  await apiRequest("some/endpoint/");
} catch (error) {
  showGlobalError(error.message || "Something went wrong.");
}
```

This will show a dismissible error banner for 5 seconds.

---

## Development & Contribution

### **Linting & Formatting**

```sh
npm run lint
npm run format
```

### **Adding Features**

- Add new scripts to `Script/` and import utilities as needed.
- Use `apiRequest` for all backend calls.
- Use `showGlobalError` for error handling.
- Use `handleSocialLogin` for OAuth.

### **Folder Conventions**

- Place all configuration in `Config/`.
- Place all scripts in `Script/`.
- Place all HTML in `Page/`.

---

## Testing

- Add unit and integration tests in a `tests/` directory (recommended).
- Use Jest or your preferred test runner for JavaScript.
- Backend testing: see Django backend README.

---

## Deployment

- **Frontend:**  
  Deploy static files to your preferred host (Netlify, Vercel, Railway, etc.).
- **Backend:**  
  Deploy Django backend as per its documentation.

---

## License

[MIT](LICENSE) or your chosen license.

---

## 🛡️ Security & Best Practices

- All API calls use CSRF protection and secure token handling.
- OAuth2 flows for Google and GitHub.
- Input sanitization and XSS prevention in all forms.
- Accessibility and performance best practices enforced via linting and CI.
- Regular dependency updates via Dependabot.

---

## 📚 Documentation

- Frontend architecture: `docs/frontend-architecture.md`
- API examples: `docs/api-examples.md`
- Troubleshooting: `docs/troubleshooting.md`
- Backend details: `Back_README.md`
- Component system: `docs/components.md`
- Testing: `docs/testing.md`
- Deployment: `docs/deployment.md`
- Onboarding: `docs/onboarding.md`

---

## 🤝 Contribution Guidelines

- PRs welcome! See `.github/pull_request_template.md`
- Lint: `npm run lint` | Format: `npm run format`
- Please review `docs/contributing.md` before submitting changes
- Issues and feature requests welcome via GitHub Issues

---

## 📈 Roadmap & Future Work

- Real-time updates via WebSocket for gamification and social features
- Advanced analytics and reporting dashboard
- Mobile-first PWA enhancements
- More integrations and third-party plugins

---

## 🧑‍💻 Technology Stack

- **Languages:** HTML5, CSS3 (modular, responsive, custom properties), JavaScript (ES6+ modules, async/await)
- **Build Tools:** Webpack, Babel, ESLint, Prettier
- **Testing:** Jest (unit/integration/E2E), test utilities, DOM mocking
- **CI/CD:** GitHub Actions (lint, test, deploy), Dependabot
- **Accessibility:** ARIA, semantic HTML, keyboard navigation, screen reader support

---

## 🏆 Acknowledgements

- [Django](https://www.djangoproject.com/)
- [Webpack](https://webpack.js.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Railway](https://railway.app/)
- [LottieFiles](https://lottiefiles.com/)

---

## Contact

For questions or contributions, open an issue or pull request on GitHub.

---

**Happy learning! 🚀**