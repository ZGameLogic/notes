FROM node:25.9.0-bookworm

RUN npm install -g next

COPY .next .next

EXPOSE 3000

CMD ["next", "start"]
