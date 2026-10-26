# GitHub Pages + Render deployment

OrbitGuard is split across two hosts because GitHub Pages only serves static files:

- Frontend: GitHub Pages at `https://orbitguard.ethanolchik.me`
- FastAPI backend and ephemeral SQLite database: Render free tier

## 1. Fork and push

Fork `KhushM7/OrbitGuard` into the `ethanolchik` GitHub account, then push these deployment changes to the fork's `main` branch.

## 2. Deploy the backend on Render

1. In Render, choose **New > Blueprint** and connect the fork.
2. Render will read `render.yaml` and create the free `orbitguard-api-ethanolchik` service.
3. Wait for the health check to pass, then copy the service URL, such as `https://orbitguard-api-ethanolchik.onrender.com`.

Render's free tier spins down after inactivity and does not provide persistent storage. The SQLite catalog is rebuilt from CelesTrak whenever Render replaces or restarts the service, so the first request after a cold start may be slow or temporarily return an empty catalog.

## 3. Configure GitHub Pages

In the fork's GitHub settings:

1. Open **Settings > Secrets and variables > Actions > Variables**.
2. Create `NEXT_PUBLIC_API_BASE` with the Render service URL (no trailing slash).
3. Open **Settings > Pages** and select **GitHub Actions** as the source.
4. Under **Custom domain**, enter `orbitguard.ethanolchik.me` and save it.
5. Run the **Deploy frontend to GitHub Pages** workflow, or push to `main`.

## 4. Configure DNS

At Namecheap, add this record:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `orbitguard` | `ethanolchik.github.io` | Automatic |

Do not add an `AAAA` record unless GitHub explicitly supplies one. After DNS and the Pages deployment are active, enable **Enforce HTTPS** in GitHub Pages settings.

## Updating

Pushing to `main` redeploys both services. The Pages workflow rebuilds the frontend with the configured API URL, while Render rebuilds the backend. Upgrade Render later only if persistent database storage and no cold starts become necessary.
