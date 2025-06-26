# RM Platform

A modular, scalable Django platform for resource and user management, featuring authentication, authorization (RBAC), user profiles, gamification (points, levels, badges), shop, social features, and more. Designed for extensibility, security, and modern API-first development using Domain-Driven Design (DDD) principles.

---

## Table of Contents
- [Project Vision](#project-vision)
- [Quick Start](#quick-start)
- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Apps](#apps)
- [Setup](#setup)
- [Example .env](#example-env)
- [API Overview](#api-overview)
- [Frontend Integration](#frontend-integration)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Documentation Links](#documentation-links)
- [License](#license)
- [Security Features](#security-features)
- [Extending the Platform](#extending-the-platform)

---

## Project Vision

**RM Platform** aims to provide a robust, extensible backend for modern web and mobile applications. It is designed to:
- Enable rapid development of secure, feature-rich platforms
- Support user engagement and growth through gamification
- Be easy to extend, customize, and maintain for teams of all sizes
- Follow best practices for security, code quality, and scalability

---

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd RM_Platform
   ```
2. **Copy environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your secrets and DB config
   ```
3. **Install dependencies:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. **Set up the database:**
   - See [Database Setup Guide](docs/database_setup.md) for details.
   - Or, for PostgreSQL:
     ```bash
     sudo -u postgres psql
     CREATE DATABASE rm_platform;
     CREATE USER rm_platform_user WITH PASSWORD 'password';
     GRANT ALL PRIVILEGES ON DATABASE rm_platform TO rm_platform_user;
     \q
     ```
5. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```
6. **Create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```
7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
8. **Access the admin:**
   - Visit `http://localhost:8000/admin/` to manage users, roles, badges, etc.
9. **API Docs:**
   - Visit `http://localhost:8000/api/docs/` for Swagger/OpenAPI documentation.

---

## Overview

RM Platform is a Django-based backend designed for modern web and mobile applications. It provides robust user management, authentication, authorization, gamification, shop, and social features. The architecture supports clean separation of concerns, easy extension, and best practices for security and maintainability.

---

## Architecture

- **Domain-Driven Design (DDD):** Each app encapsulates its own models, services, serializers, views, permissions, and URLs.
- **Layered Architecture:** Clear separation between domain logic, infrastructure (database, email, cache, storage), and API layers.
- **BaseModel:** All models inherit from a shared abstract base for UUID PK, timestamps, audit, and soft delete.
- **Soft Delete:** Implemented via `is_deleted` and `deleted_at` fields, with a custom manager/queryset.
- **Custom Middleware:** Handles security, logging, rate limiting, and more.
- **Environment-based settings:** Separate settings for dev, prod, and testing.
- **Extensibility:** Designed for easy addition of new domains/apps, signals, and utilities.
- **12-factor app principles:** Configuration via environment variables, statelessness, and portability.

**See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a deep dive.**

### Key Architectural Patterns
- **Domain Models:** Encapsulate business logic, integrated with Django ORM for persistence.
- **Token Management:** Database-backed models for password reset and email verification tokens.
- **Testing:** Each app has its own test suite for models, views, and serializers.
- **Infrastructure Layer:** Shared utilities for email, cache, storage, and database.

---

## Security Features

- **JWT Refresh Token Rotation & Blacklisting:**
  - Refresh tokens are rotated on every use and the old token is blacklisted, preventing replay attacks.
  - Blacklisted tokens cannot be reused for refresh or logout.
- **SameSite=Strict for JWT Cookies:**
  - All JWT cookies are set with `SameSite=Strict` for maximum CSRF protection.
- **Brute-force Protection:**
  - API endpoints are protected by Django REST Framework throttling to prevent brute-force attacks on login, registration, and token refresh.
- **Audit Logging:**
  - Suspicious token activity (e.g., attempts to use blacklisted or invalid tokens) is logged for security monitoring.
- **Token Revocation on Password Change:**
  - When a user changes their password, all outstanding refresh tokens for that user are revoked (blacklisted), forcing re-authentication.
- **Custom Middleware:**
  - Security headers, CORS, and rate limiting.
- **Role-Based Access Control (RBAC):**
    - Granular permissions for all major actions.

---

## Features
- User registration, login, password reset, and profile management
- JWT authentication and session management
- Role and permission management (RBAC)
- Audit logging and soft delete for models
- Gamification: points, levels, badges, streaks, quests, challenges, events, and progress bar
- Shop: categories, items, purchases, inventory, unlocks via points/badges
- Social: comments, likes, shares, discussions, referrals, following, activity feed
- Courses: categories, courses, sections, lessons, enrollments, reviews, progress
- Admin management for all core models
- API endpoints for all major features
- Extensible shared utilities and signals
- Customizable permissions and validators
- Easy integration with frontend frameworks (React, Vue, etc.)

### **authentication**
Handles all aspects of user authentication:
- User registration, login, logout, and password reset
- JWT-based authentication for secure, stateless sessions
- **Refresh token rotation and blacklisting for enhanced security**
- **All JWT cookies use SameSite=Strict**
- **All tokens are revoked on password change**
- Email verification and password reset flows
- API endpoints for all authentication actions
- **Audit logging for suspicious token activity**

### **authorization**
Implements Role-Based Access Control (RBAC):
- Define roles (e.g., admin, user, moderator)
- Assign permissions to roles and users
- Enforce permissions at the API and model level
- Services for permission checks and role management

### **users**
Manages user profiles and preferences:
- UserProfile model extends the user with phone, picture, preferences
- Endpoints for profile update, search, and "me" endpoint
- Admin and API access to user data

### **gamification**
Drives user engagement through points, levels, and badges:
- Award points for actions (registration, login, etc.)
- Track user levels, progress, badges, and activity log
- Admin endpoints for awarding points/badges and managing levels/badges
- Automatic point and badge awarding via signals
- See [`apps/gamification/README.md`](apps/gamification/README.md) for details

### **shop**
Virtual shop for digital goods and unlocks:
- Categories, items, purchases, inventory
- Unlock items via points, badges, or levels
- API endpoints for shop management and user inventory

### **courses**
Course management and learning platform:
- Categories, courses, sections, lessons
- Enrollments, progress tracking, reviews
- API endpoints for all course features

### **social**
Social features for user engagement:
- Comments, likes, shares, discussions, referrals, following, activity feed
- API endpoints for all social features

### **shared**
Provides cross-cutting utilities and base classes:
- Abstract base models (UUID, timestamps, audit, soft delete)
- Shared permissions, exceptions, validators, pagination, utils, signals, constants, enums
- Central place for reusable logic and DRY code

---

## Project Structure

```
RM_Platform/
├── api/                # API versioning and routing
├── apps/               # Main Django apps (domains)
│   ├── authentication/ # User authentication (JWT, registration, login, etc.)
│   ├── authorization/  # RBAC: roles, permissions, assignments
│   ├── users/          # User profiles, preferences
│   ├── gamification/   # Points, levels, badges, activity log
│   ├── shop/           # Virtual shop, purchases, inventory
│   ├── courses/        # Courses, sections, lessons, enrollments
│   ├── social/         # Comments, likes, shares, discussions, feed
│   └── shared/         # Cross-cutting utilities, base models, permissions
├── config/             # Django settings, ASGI/WSGI, celery
├── core/               # Core project models and apps
├── infrastructure/     # Email, cache, storage, database utilities
├── middleware/         # Custom middleware (auth, logging, rate limiting)
├── requirements/       # Requirements by environment
├── docs/               # Project documentation
├── static/             # Static files
├── templates/          # Email and HTML templates
└── manage.py           # Django management script
```

---

## Apps

- **authentication:** Handles registration, login, logout, password reset, JWT, and profile endpoints.
- **authorization:** Role-based access control (RBAC), roles, permissions, and assignments.
- **users:** User profiles, preferences, and search.
- **gamification:** Points, levels, badges, streaks, quests, challenges, events, and activity log. [See details](apps/gamification/README.md)
- **shop:** Virtual shop for digital goods, purchases, and inventory.
- **courses:** Course management, sections, lessons, enrollments, reviews, and progress.
- **social:** Comments, likes, shares, discussions, referrals, following, and activity feed.
- **shared:** Abstract base models, permissions, exceptions, validators, pagination, signals, constants, enums, and utilities.

---

## Setup

See [Quick Start](#quick-start) above. For advanced configuration, see [docs/database_setup.md](docs/database_setup.md) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Example .env

See `.env.example` for a template. Key variables:
- `DJANGO_SECRET_KEY`, `DEBUG`, `DATABASE_URL`, `EMAIL_HOST`, etc.

---

## API Overview

- All endpoints are under `/api/v1/`
- JWT authentication is required for most endpoints
- See each app's `urls.py` and DRF schema for details
- Full API reference: [api.md](api.md)
- Interactive docs: `/api/docs/` (Swagger/OpenAPI)

### Key Endpoints
- `/api/v1/auth/` — Register, login, logout, password reset, profile, token refresh, CSRF, token status
- `/api/v1/users/` — Profile, update, search, preferences
- `/api/v1/authorization/` — Roles, permissions, assignments
- `/api/v1/gamification/` — Points, levels, badges, activity log, streaks, quests, challenges, events
- `/api/v1/courses/` — Categories, courses, sections, lessons, enrollments, reviews
- `/api/v1/shop/` — Categories, items, purchases, inventory
- `/api/v1/social/` — Comments, likes, shares, discussions, referrals, following, feed

### Example: Register a User
```http
POST /api/v1/auth/register/
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```

### Example: Get User Profile (Authenticated)
```http
GET /api/v1/users/me/
Authorization: Bearer <your-jwt-token>
```

### Example: Award Points (Admin)
```http
POST /api/v1/gamification/award/award_points/
Authorization: Bearer <admin-jwt-token>
Content-Type: application/json
{
  "user_id": "<user-uuid>",
  "points": 100,
  "action": "bonus",
  "description": "Awarded for special achievement"
}
```

### Security Notes
- All authentication endpoints use JWT with refresh token rotation and blacklisting.
- JWT cookies are set with `SameSite=Strict`, `Secure`, and `HttpOnly` flags.
- Brute-force protection is enforced via API throttling.
- All refresh tokens are revoked on password change.
- Suspicious token activity is logged for audit and monitoring.

---

## Frontend Integration

- Use the provided JavaScript SDK (`static/js/auth-sdk.js`) for automatic JWT token management in frontend apps.
- Backend sets JWT tokens in secure httpOnly cookies or returns them in JSON for localStorage fallback.
- SDK handles login, logout, token refresh, and automatic Authorization header attachment.
- For cookie-based auth, CSRF tokens are managed automatically.

---

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for production setup, environment variables, and scaling tips.

---

## Testing

- Each app contains its own tests for models, views, and serializers.
- Run all tests:
  ```bash
  python manage.py test
  ```
- For test settings, see `config/settings/testing.py`.

---

## Troubleshooting

- Check logs in the `logs/` directory for errors.
- Ensure environment variables are set correctly.
- For database issues, see [docs/database_setup.md](docs/database_setup.md).
- For JWT/auth issues, see [docs/JWT_AUTO_ATTACHMENT.md](docs/JWT_AUTO_ATTACHMENT.md).

---

## Contributing

- Fork the repo and create a feature branch.
- Write tests for new features.
- Follow code style and best practices.
- Submit a pull request with a clear description.

---

## Documentation Links
- [Architecture](docs/ARCHITECTURE.md)
- [Database Setup](docs/database_setup.md)
- [Deployment](docs/DEPLOYMENT.md)
- [JWT Auto Attachment](docs/JWT_AUTO_ATTACHMENT.md)
- [Gamification App](apps/gamification/README.md)

---

## License

MIT License. See `LICENSE` file.

---

## Security Features

See [Security Features](#security-features) above for a summary of all security mechanisms.

---

- For advanced gamification features, see [apps/gamification/README.md](apps/gamification/README.md).