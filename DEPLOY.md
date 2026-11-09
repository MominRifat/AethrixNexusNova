# Deployment Guide: Aethrix Nexus Nova

This guide outlines deployment procedures for **Vercel** (recommended for edge distribution) and **Self-Hosted VPS** via Docker.

---

## 1. Deploying on Vercel (Edge Native)

Vercel provides native edge caching, Turbopack builds, and instant global CDN routing.

### Steps:
1. **Push Repository to GitHub / GitLab:**
   ```bash
   git init
   git add .
   git commit -m "feat: enterprise production release"
   git remote add origin <your-git-remote-url>
   git push -u origin main
   ```
2. **Import Project into Vercel:**
   * Navigate to [vercel.com/new](https://vercel.com/new).
   * Select your Git repository.
   * Framework Preset: **Next.js** (automatically detected).
3. **Configure Environment Variables in Vercel Dashboard:**
   Under **Project Settings → Environment Variables**, add:
   * `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key from Google AI Studio. (If omitted, the platform runs in deterministic mock demo mode).
   * `DJANGO_LEAD_ENDPOINT`: *(Optional)* HTTPS webhook URL for external CRM / Django backend.
   * `DJANGO_LEAD_TOKEN`: *(Optional)* Bearer token for Django lead authentication.
4. **Deploy:**
   * Click **Deploy**. Vercel will build and serve the application globally with automatic SSL.

---

## 2. Deploying on a VPS with Docker

For self-hosted Linux servers (Ubuntu 22.04 / 24.04, Debian 12, etc.).

### Prerequisites:
* Docker Engine 24+ and Docker Compose v2 installed.

### Steps:
1. **Clone the repository on your server:**
   ```bash
   git clone <your-git-remote-url> /opt/aethrix-nexus
   cd /opt/aethrix-nexus
   ```
2. **Create production environment configuration:**
   ```bash
   cp .env.example .env
   nano .env
   ```
   Add your production keys if available:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   DJANGO_LEAD_ENDPOINT=https://api.yourdomain.com/v1/leads
   DJANGO_LEAD_TOKEN=your_secure_token_here
   ```
3. **Build and launch container:**
   ```bash
   docker compose up -d --build
   ```
4. **Verify container health:**
   ```bash
   docker compose ps
   docker compose logs -f web
   ```
   The site will be running on `http://localhost:3000`.

### Reverse Proxy Setup (Nginx Example):
```nginx
server {
    listen 80;
    server_name aethrixnexus.nova www.aethrixnexus.nova;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Secure with Certbot: `sudo certbot --nginx -d aethrixnexus.nova -d www.aethrixnexus.nova`

---

## Environment Variables Reference

| Variable | Required | Description | Default |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | No | Server-side API key for AI Solution Architect | Falls back to Deterministic Mock Engine |
| `DJANGO_LEAD_ENDPOINT` | No | Target HTTPS endpoint for lead capture | Appends to local `leads.ndjson` |
| `DJANGO_LEAD_TOKEN` | No | Bearer token for Django authorization | None |
| `BUILD_STANDALONE` | No | Enables Next.js standalone output for Docker | Automatically set in Dockerfile |
