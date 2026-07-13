FROM node:25.9.0-bookworm

WORKDIR /app

COPY .next .next
COPY node_modules node_modules

run npm i next -g

EXPOSE 3000
CMD ["next", "start"]