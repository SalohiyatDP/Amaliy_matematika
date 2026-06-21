# ───────────────────────── Build stage ─────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Bog'liqliklarni keshlash uchun avval manifestlarni ko'chiramiz
COPY package.json package-lock.json ./
RUN npm ci

# Manba kodini ko'chirib, production build qilamiz
COPY . .
RUN npm run build

# ───────────────────────── Serve stage ─────────────────────────
FROM nginx:1.27-alpine AS production

# SPA uchun nginx sozlamasi (React Router fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build natijasini nginx root'iga ko'chiramiz
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Konteyner sog'lig'ini tekshirish
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
