# Dockerfile en la raíz del repo
FROM node:20-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./backend/
COPY backend/server.js ./backend/
COPY backend/db.js ./backend/
COPY geosentinel ./geosentinel
COPY public ./public

WORKDIR /app/backend
RUN npm install --production

EXPOSE 3001
CMD ["node", "server.js"]