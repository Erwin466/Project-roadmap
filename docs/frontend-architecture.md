# Frontend Architecture Guide

## Overview
This document describes the frontend architecture, API integration, component system, and development workflow for the Roadmap Learning Platform.

## Directory Structure
- `Page/` - HTML pages
- `Script/` - JavaScript modules (ES6+)
- `Style/` - CSS (modular, responsive)
- `Config/` - Auth SDK and config
- `tests/` - Unit/integration/E2E tests
- `docs/` - Documentation

## API Integration
- All API calls use `/api/v1/` endpoints
- Auth handled via JWT (see `Config/auth-sdk.js`)
- Gamification, shop, and social modules use documented endpoints

## Component System
- See `Script/components.js` for reusable UI components
- Accessibility and ARIA best practices enforced

## Development
- Use `npm run dev` for local development
- Lint: `npm run lint` | Format: `npm run format`
- Test: `npm run test`
- Build: `npm run build`

## Contribution
- See `CONTRIBUTING.md` for guidelines

## Troubleshooting
- See `docs/troubleshooting.md`

## API Examples
- See `docs/api-examples.md`

---
For backend details, see `Back_README.md`.
