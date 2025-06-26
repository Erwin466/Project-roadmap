# RM Platform API Documentation

This document provides an overview of all API endpoints available in the RM Platform, organized by version and domain. The API follows RESTful principles and is versioned under `/api/v1/`.

---

## Table of Contents
- [Authentication](#authentication)
- [Users](#users)
- [Authorization](#authorization)
- [Gamification](#gamification)
- [Courses](#courses)
- [Shop](#shop)
- [Social](#social)
- [API Versioning & Notes](#api-versioning--notes)
- [Security Notes](#security-notes)

---

## Authentication
**Base Path:** `/api/v1/auth/`

| Endpoint           | Method | Description                |
|--------------------|--------|----------------------------|
| `/register/`       | POST   | Register a new user        |
| `/login/`          | POST   | Login with credentials     |
| `/logout/`         | POST   | Logout current user        |
| `/password-reset/` | POST   | Request password reset     |
| `/profile/`        | GET    | Get user profile           |
| `/refresh/`        | POST   | Refresh JWT token          |
| `/csrf/`           | GET    | Get CSRF token (cookie)    |
| `/token-status/`   | GET    | Check JWT authentication   |

**Notes:**
- Registration (`/register/`) is available and enabled by default.
- JWT authentication supports both Authorization header and secure httpOnly cookies.
- Use `/token-status/` to check if the user is authenticated.
- Use `/csrf/` to obtain a CSRF token for cookie-based authentication.
- For OpenAPI/Swagger docs, see `/api/docs/`.

**Example:**
```http
POST /api/v1/auth/register/
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```

---

## Users
**Base Path:** `/api/v1/users/`

| Endpoint         | Method        | Description                        |
|------------------|--------------|------------------------------------|
| `/`              | GET, POST     | List users / Create a new user     |
| `/<id>/`         | GET, PUT, PATCH, DELETE | Retrieve, update, or delete user |
| `/me/`           | GET           | Get current user's profile         |
| `/search/`       | GET           | Search users                       |
| `/preferences/`  | GET, PUT      | Get or update user preferences     |

**Example:**
```http
GET /api/v1/users/me/
Authorization: Bearer <your-jwt-token>
```

---

## Authorization
**Base Path:** `/api/v1/authorization/`

| Endpoint         | Method        | Description                |
|------------------|--------------|----------------------------|
| `/roles/`        | CRUD         | Manage roles               |
| `/permissions/`  | CRUD         | Manage permissions         |
| `/user-roles/`   | CRUD         | Assign roles to users      |

---

## Gamification
**Base Path:** `/api/v1/gamification/`

| Endpoint           | Method | Description                  |
|--------------------|--------|------------------------------|
| `/profile/`        | GET   | User point profile           |
| `/leaderboard/`    | GET   | Leaderboard                  |
| `/streaks/`        | GET   | User streaks                 |
| `/quests/`         | GET, POST   | Quests                       |
| `/challenges/`     | GET, POST   | Challenges                   |
| `/events/`         | GET   | Gamification events          |
| `/achievements/`   | GET   | User achievements            |
| `/badges/`         | GET   | List and manage badges       |
| `/levels/`         | GET   | List and manage levels       |
| `/award/award_points/` | POST | Admin: award points         |
| `/award/award_badge/`  | POST | Admin: award badge          |

**Example:**
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

**See [apps/gamification/README.md](apps/gamification/README.md) for advanced usage and extension points.**

---

## Courses
**Base Path:** `/api/v1/courses/`

| Endpoint                              | Method | Description                                 |
|---------------------------------------|--------|---------------------------------------------|
| `/categories/`                        | GET   | Manage course categories                    |
| `/courses/`                           | GET, POST   | Manage courses                              |
| `/courses/<course_id>/sections/`      | GET, POST   | Manage sections in a course                 |
| `/sections/<section_id>/lessons/`     | GET, POST   | Manage lessons in a section                 |
| `/enrollments/`                       | GET, POST   | Manage enrollments                          |
| `/reviews/`                           | GET, POST   | Manage course reviews                       |
| `/progress/`                          | GET    | Get user progress in courses/lessons        |
| `/completion/`                        | POST   | Mark course/lesson as completed             |

---

## Shop
**Base Path:** `/api/v1/shop/`

| Endpoint         | Method | Description                |
|------------------|--------|----------------------------|
| `/categories/`   | GET   | Manage shop categories     |
| `/items/`        | GET, POST   | Manage shop items          |
| `/purchases/`    | GET, POST   | Manage purchases           |
| `/inventory/`    | GET   | User inventory             |

---

## Social
**Base Path:** `/api/v1/social/`

| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/comments/`            | GET, POST   | Manage comments                    |
| `/likes/`               | GET, POST   | Manage likes                       |
| `/shares/`              | GET, POST   | Manage shares                      |
| `/discussions/`         | GET, POST   | Manage discussions                 |
| `/discussion-replies/`  | GET, POST   | Manage discussion replies          |
| `/referrals/`           | GET, POST   | Manage referrals                   |
| `/following/`           | GET, POST   | Manage user following              |
| `/feed/`                | GET   | Activity feed                      |
| `/activity/`            | GET    | Get user or global activity log    |

---

## API Versioning & Notes
- All endpoints are versioned under `/api/v1/`.
- Future versions will be available under `/api/v2/`, etc.
- All endpoints follow RESTful conventions and use DRF ViewSets or APIViews.
- JWT authentication is used for protected endpoints.
- For detailed request/response schemas, see the OpenAPI/Swagger docs at `/api/docs/`.
- The platform is designed for extensibility; new endpoints and domains can be added easily.

---

## Security Notes
- Most endpoints require JWT authentication (see `/api/v1/auth/login/` and `/api/v1/auth/refresh/`).
- JWT cookies are set with `SameSite=Strict`, `Secure`, and `HttpOnly` flags for maximum CSRF protection.
- Brute-force protection is enforced via API throttling.
- All refresh tokens are revoked on password change.
- Suspicious token activity is logged for audit and monitoring.
- See [README.md](README.md#security-features) for a full list of security mechanisms.

---

## Extending the API
- Document new endpoints here and in the app's own README if needed.