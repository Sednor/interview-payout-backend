# AGENTS.md

## Rules

Treat the payment providers as external third-party services. Investigate them through the supplied documentation, HTTP requests, responses and application logs. Do not retrieve provider implementation source, container contents or interviewer-only materials. AI tools follow the same rules.

## Project

- NestJS 11, TypeScript 5, Node.js 22+, npm (exact versions; `package-lock.json` is committed).
- Task and API contract: `TASK.md`. Request/response types: `src/payout/payout.contract.ts`.
- Configuration: `src/config/configuration.ts` and `.env.example`.
- Providers: run locally from the separate `interview-payout-providers` repository (`docker compose up --build`). Provider A is http://localhost:5001 and Provider B is http://localhost:5002, with docs at `/docs`. Use them only over HTTP, and never open or search the provider source.

## Commands

- `npm start`: dev server with watch on http://localhost:3100
- `npm test`: Jest tests (`*.spec.ts`, next to the code)
- `npm run typecheck`: type-check
