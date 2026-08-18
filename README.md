# Hiristic / AI-kurva

AI-kurva is a production-ready Next.js marketing site for Hiristic, a technical delivery partner that helps companies automate operations with AI, orchestration, and modern automation tooling hosted within the EU.

## Project overview

The site is built to communicate three core themes:
- AI-driven automation for business workflows
- GDPR-aware delivery with EU-hosted tooling and data residency in mind
- A controlled delivery model across dev, staging, and production

## Tech stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS v4
- Vitest + Testing Library for unit tests
- Playwright for system tests
- GitHub Actions for CI/CD
- Vercel for deployment targets

## Local development

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Set at least `CONTACT_API_URL` to your EU-hosted endpoint.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

The root route redirects to `/sv`. English is available under `/en`.

## Environment variables

### Application

- `CONTACT_API_URL`: Required. EU-hosted HTTPS endpoint that will receive contact form submissions.
- `CONTACT_API_BEARER_TOKEN`: Optional. Server-side bearer token forwarded to the contact endpoint.
- `CONTACT_API_TIMEOUT_MS`: Optional. Timeout in milliseconds for the proxy request.

### Deployment / CI

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `DEV_ALIAS_DOMAIN` (optional but recommended)
- `STAGING_ALIAS_DOMAIN` (optional but recommended)
- `PROD_ALIAS_DOMAIN` (optional but recommended)

Store the deployment values as GitHub repository secrets.

## Contact endpoint setup

The contact form posts to `/api/contact`, which acts as a Next.js server route proxy.

Why this setup exists:
- The browser never receives any API secret.
- The upstream contact service can be replaced without changing client code.
- The endpoint can remain EU-hosted while the site keeps a simple frontend integration.

Expected upstream behaviour:
- Accept `POST` requests with JSON.
- Return any `2xx` response on success.
- Run in an EU-hosted region/service.

Suggested payload fields:
- `name`
- `company`
- `email`
- `message`
- `source`
- `submittedAt`

## Testing

Run local checks:

```bash
npm run lint
npm test
npm run test:e2e
```

### Coverage included

Unit tests cover:
- locale switching logic
- contact form validation
- cookie consent logic

Playwright E2E covers:
- page load
- locale switch from Swedish to English
- cookie banner display and acceptance
- contact form submission with a mocked endpoint

## CI/CD flow

### Branch strategy

- `develop`: integration branch and dev deployment source
- `staging`: pre-production verification branch
- `main`: production branch
- feature branches: open PRs into `develop`

### Workflow sequence

1. **CI** (`.github/workflows/ci.yml`)
   - Runs on every push and pull request
   - Installs dependencies
   - Runs lint, unit tests, and production build

2. **Deploy Dev** (`.github/workflows/deploy-dev.yml`)
   - Runs after a successful CI workflow on `develop`
   - Builds and deploys a Vercel preview build for the dev environment
   - Optionally aliases the deployment to `DEV_ALIAS_DOMAIN`

3. **E2E Dev** (`.github/workflows/e2e-dev.yml`)
   - Runs after a successful dev deployment
   - Downloads the deployment URL artifact
   - Executes Playwright against the deployed dev site

4. **Auto PR to Staging** (`.github/workflows/auto-pr-staging.yml`)
   - Runs after successful E2E on `develop`
   - Creates a PR from `develop` to `staging` if one does not already exist

5. **Deploy Staging** (`.github/workflows/deploy-staging.yml`)
   - Runs on pushes/merges to `staging`
   - Deploys the staging environment and can alias it to `STAGING_ALIAS_DOMAIN`

6. **Deploy Production** (`.github/workflows/deploy-prod.yml`)
   - Runs on pushes/merges to `main`
   - Builds and deploys production and can alias it to `PROD_ALIAS_DOMAIN`

## Environment usage

- **Dev**: automatic verification environment sourced from `develop`
- **Staging**: review and acceptance environment sourced from `staging`
- **Production**: live environment sourced from `main`

Recommended Vercel mapping:
- Use preview deployments for `develop` and `staging`
- Use production deployment for `main`
- Point stable domains/subdomains to the aliased deployment URLs

## Branch protection recommendations

Configure GitHub branch protection rules for:

### `develop`
- Require pull requests before merging
- Require the `CI / test-and-lint` check
- Restrict direct pushes except for administrators if desired

### `staging`
- Require pull requests before merging
- Require `CI / test-and-lint`
- Require manual review before merge
- Optionally require successful staging verification checks before promotion to `main`

### `main`
- Require pull requests before merging
- Require `CI / test-and-lint`
- Restrict force-push and deletion
- Require at least one reviewer

## GDPR and compliance notes

- The site content explicitly communicates EU-hosted tooling and avoidance of unnecessary US data exports.
- The contact form uses a server-side proxy to keep secrets out of the client.
- Cookie consent is stored to avoid repeated prompts while preserving user choice.
- Separate privacy pages are available in Swedish and English.
