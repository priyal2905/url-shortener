# URL Shortener & Analytics Service

A production-oriented URL shortener with authentication, caching, rate limiting, and click analytics — built to demonstrate backend system design, not just CRUD.

## Features

- Counter-based Base62 short code generation (no collision retries needed)
- JWT authentication for link creation
- Redis cache-aside pattern for high-read redirect performance
- Rate limiting on link creation to prevent abuse
- Async click-event logging (non-blocking redirects)
- Fully containerized (Docker + Docker Compose)
- CI pipeline via GitHub Actions

## Architecture

Request → Controller → Service → Repository → Database
↓
Redis (cache-aside)

Layered design: controllers handle HTTP only, services hold business logic, repositories handle DB access exclusively. Each layer has one reason to change.

## Tech Stack

Node.js, TypeScript, Express, PostgreSQL, Redis, Docker, Jest, GitHub Actions

## API Endpoints

| Method | Endpoint       | Auth required | Description              |
| ------ | -------------- | ------------- | ------------------------ |
| POST   | /auth/register | No            | Create a user            |
| POST   | /auth/login    | No            | Get a JWT token          |
| POST   | /shorten       | Yes           | Create a short URL       |
| GET    | /:code         | No            | Redirect to original URL |
| GET    | /health        | No            | Health check             |

## Running locally

\`\`\`bash
git clone https://github.com/priyal2905/url-shortener.git
cd url-shortener
cp .env.example .env
docker compose up --build
npm run migrate
\`\`\`

Server runs at `http://localhost:3000`.

## Running tests

\`\`\`bash
npm test
\`\`\`

## Design decisions & trade-offs

- **Counter + Base62 over random strings**: guarantees uniqueness with zero collision-retry logic, at the cost of sequential/guessable codes. A production system might XOR/obfuscate the counter to mitigate this.
- **Cache-aside over write-through**: only caches actively-read links, keeping memory usage proportional to real traffic patterns rather than caching every link on write.
- **Fire-and-forget click logging**: prioritizes redirect latency over guaranteed analytics durability. A production system at scale would push click events to a message queue (Kafka/SQS) instead of a direct async DB write, to survive crashes mid-write.
- **JWT over sessions**: stateless auth, no shared session store needed — trades off easy token revocation before expiry.
