# ---- 1. 建置靜態網站 ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG SITE_URL=http://localhost:8080
ARG BASE_URL=/
ENV SITE_URL=$SITE_URL BASE_URL=$BASE_URL
RUN npm run build

# ---- 2. 用 nginx 提供網頁 ----
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
