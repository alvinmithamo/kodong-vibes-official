# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9679ef86-be25-481d-a15d-8d37232208d2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9679ef86-be25-481d-a15d-8d37232208d2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## E‑commerce Liquor Store – Dev Quickstart

### Stack
- React (Vite, TypeScript, Tailwind, shadcn-ui)
- Node.js/Express API (TypeScript)
- PostgreSQL (Prisma ORM)
- Redis (sessions/checkout state/inventory locks)

### Run locally (no Docker)
1. Start Postgres and Redis locally (or with Docker separately).
2. Configure server env:
   - Copy `server/.env.example` to `server/.env` and adjust values.
3. Install deps and migrate:
   - `cd server && npm i && npx prisma generate && npx prisma migrate dev && npm run seed`
4. Start API: `npm run dev` (in `server/`)
5. Start web: `npm i` (at repo root) then `npm run dev`
   - The web dev server proxies `/api` to `http://localhost:8080`.

### Run with Docker Compose
1. Copy `server/.env.example` to `server/.env` and set secrets.
2. Build and run Postgres/Redis first with your local Docker or use external services.
3. Build images and run:
   - `docker compose up -d postgres redis`
   - Run Prisma migrations locally (needs `docker` available for server build) or run the server locally once to migrate.
   - `docker compose build server web`
   - `docker compose up -d server web`
4. Open web at http://localhost:5173 and API at http://localhost:8080/api/health

### Payments (sandbox)
- M-Pesa Daraja sandbox credentials required for STK push.
- Flutterwave public/secret keys for hosted checkout and webhook secret.
- Webhooks:
  - M-Pesa: `POST /api/webhooks/mpesa`
  - Flutterwave: `POST /api/webhooks/flutterwave` with `verif-hash` header.

### Security
- JWT auth with secure secret in `server/.env` (`JWT_SECRET`).
- Do not store card data; use Flutterwave hosted page.
- Validate webhook signatures and enforce idempotency.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9679ef86-be25-481d-a15d-8d37232208d2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
