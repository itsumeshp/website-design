# Deploying to the GCP VM

The site runs as two Docker containers (Next.js + Payload app, and Postgres)
on the existing Compute Engine VM, behind the VM's existing Nginx which
terminates TLS and reverse-proxies the public domain to the app on
`127.0.0.1:3000`.

## 1. First-time setup on the VM

```bash
# clone / copy the app-next directory onto the VM, then:
cd app-next
cp .env.production.example .env
# edit .env: set POSTGRES_PASSWORD, DATABASE_URI (same password), PAYLOAD_SECRET
# (openssl rand -hex 32), NEXT_PUBLIC_SERVER_URL (https://your-domain), Resend keys.

docker compose -f docker-compose.prod.yml up -d --build
```

On start the app container runs `payload migrate` (creating the schema on a
fresh DB), then serves on `127.0.0.1:3000`. Create the first admin user by
visiting `https://your-domain/admin`.

## 2. Nginx server block (on the host)

Add a vhost alongside the existing sites (e.g. `/etc/nginx/sites-available/fexo`):

```nginx
server {
    listen 80;
    server_name your-domain.example;

    # Allow larger admin media uploads
    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/fexo /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

> The `X-Forwarded-For` header is what the contact form's rate limiter reads,
> so keep it set.

## 3. TLS (Let's Encrypt / certbot)

```bash
certbot --nginx -d your-domain.example
```

Certbot rewrites the vhost to listen on 443 and auto-renews.

## 4. Deploying updates

```bash
cd app-next
git pull                                   # or copy new files
docker compose -f docker-compose.prod.yml up -d --build
```

Each deploy rebuilds the image and re-runs `payload migrate` (no-op if there
are no new migrations). After changing the Payload schema locally, generate a
migration and commit it:

```bash
npm run migrate:create <name>
```

## 5. Database backups

Uploaded media lives in the `media` Docker volume; the database in `pgdata`.
Add a daily `pg_dump` cron on the host:

```bash
# crontab -e
0 3 * * * docker compose -f /path/to/app-next/docker-compose.prod.yml exec -T postgres \
  pg_dump -U fexo fexo | gzip > /var/backups/fexo-$(date +\%F).sql.gz
```

Restore: `gunzip -c backup.sql.gz | docker compose ... exec -T postgres psql -U fexo -d fexo`.

## Notes / checklist before go-live

- [ ] Change the seeded admin password (dev seed uses `changeme123`).
- [ ] Set a strong `POSTGRES_PASSWORD` and `PAYLOAD_SECRET`.
- [ ] Set Resend keys to enable contact-form emails (optional).
- [ ] Confirm the VM has spare RAM (~1GB) for the app + Postgres containers.
- [ ] Upload real logo/images and replace placeholder content in `/admin`.
- [ ] `docker compose -f docker-compose.prod.yml logs -f app` to watch startup.
