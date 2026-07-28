# OM Satyam

## Deploy with Docker Compose

1. Install Docker and Docker Compose.
2. Copy `.env.example` to `.env` and set `JWT_SECRET` and `MONGO_ROOT_PASSWORD` to strong values. Add the Cloudinary and notification values if those features are used.
3. Start the stack:

   ```sh
   docker compose up -d --build
   ```

4. Open `http://localhost` or `http://your-server-ip` (or the port configured by `APP_PORT`). The API health endpoint is `/api/health`.

The Compose stack contains the React frontend, Express backend, and a persistent MongoDB volume. Nginx serves the frontend and proxies `/api` to the backend, so `VITE_API_URL=/api` is the recommended production setting.

For a real domain, put HTTPS in front of the frontend container or use a reverse proxy such as Caddy or Traefik. Keep `COOKIE_SECURE=true` for HTTPS. For a plain-HTTP local test only, set `COOKIE_SECURE=false` in `.env` and recreate the backend container.

To use MongoDB Atlas instead of the bundled MongoDB, set `MONGO_URI` in `.env` to the Atlas connection string and remove the `mongo` service plus the backend `depends_on` block from a deployment override file.

Useful commands:

```sh
docker compose logs -f backend
docker compose ps
docker compose down
```

`docker compose down` keeps the database volume. Add `-v` only if you intentionally want to remove the local MongoDB data.
