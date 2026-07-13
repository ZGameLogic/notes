FROM node:25.9.0-bookworm

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY .next .next

EXPOSE 3000
CMD ["npm", "start"]