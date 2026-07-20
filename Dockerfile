# Production image for the Fexo site (Next.js + Payload CMS).
# Runs DB migrations on start, then serves the app. Deployed via
# docker-compose.prod.yml on the GCP VM behind Nginx.
FROM node:22-alpine

# sharp (image processing) needs the musl compat shim on Alpine.
# Match the npm version used to write package-lock.json so `npm ci` resolves
# the same dependency tree.
RUN apk add --no-cache libc6-compat && npm install -g npm@11
WORKDIR /app

# NEXT_PUBLIC_* values are inlined at build time, so the public site URL must
# be available during `next build` (used for canonical/OG/sitemap URLs).
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

# Install all deps (dev deps are needed for the build + the payload CLI used
# by migrations at runtime).
COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

# Apply committed migrations, then start. If migrate fails the container exits
# (so a bad deploy doesn't serve against a half-migrated schema).
CMD ["sh", "-c", "npm run migrate && npm run start"]
