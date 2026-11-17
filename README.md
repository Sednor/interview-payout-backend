# Interview Payout Backend (NestJS)

Backend for the payout exercise. It exposes the application API used by the web app (`interview-payout-frontend`) and calls two external payment providers.

```
interview-payout-frontend  ──►  interview-payout-backend (this repo)  ──►  Provider A / Provider B
     localhost:5173                      localhost:3100                    localhost:5001 / 5002
```

## Prerequisites

- Node.js 22 or newer (`.nvmrc` pins 22) and npm
- Docker, and the payment providers running from the `interview-payout-providers` repository (`docker compose up --build`, http://localhost:5001 and http://localhost:5002)

You don't need to install any NestJS tooling globally. The Nest CLI is a local dev dependency.

## Setup

```bash
npm ci
cp .env.example .env   # optional: every value has a working default
npm start              # watch mode, http://localhost:3100
```

Check that it is running:

```bash
curl http://localhost:3100/health
# {"status":"ok"}
```

Swagger UI is at http://localhost:3100/swagger (outside production).

## Commands

| Command | Purpose |
|---|---|
| `npm start` | Run in watch mode |
| `npm test` | Run the Jest tests (`*.spec.ts`) |
| `npm run typecheck` | Type-check without emitting |
| `npm run build` / `npm run start:prod` | Build to `dist/` and run the build |
| `npm run format` | Format with Prettier |

## Configuration

Values are read from environment variables, or from a `.env` file if one exists.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3100` | HTTP port |
| `CORS_ORIGIN` | `http://localhost:5173` | Allowed browser origin(s), comma-separated |
| `PROVIDER_A_BASE_URL` | `http://localhost:5001` | Provider A base URL |
| `PROVIDER_B_BASE_URL` | `http://localhost:5002` | Provider B base URL |
| `UPSTREAM_TIMEOUT_MS` | `3000` | Timeout for provider calls |

## Project layout

```
src/
  main.ts                    bootstrap: CORS, Swagger, port
  app.module.ts              root module, global config
  config/configuration.ts    typed configuration (ConfigService<AppConfig, true>)
  health/                    GET /health and an example HTTP test
  payout/
    payout.controller.ts     payout controller (no endpoints yet)
    payout.module.ts         HttpService (axios) preconfigured with the upstream timeout
    payout.contract.ts       application API request/response types
```

## Provider documentation

Each provider serves Swagger docs at `<base URL>/docs`. For example: http://localhost:5001/docs and http://localhost:5002/docs.
