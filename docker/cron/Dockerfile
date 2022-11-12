FROM node:16.13.0-alpine

WORKDIR /app

COPY ./cron/package.json /app
COPY ./cron/package-lock.json /app

RUN npm install

COPY ./cron /app

CMD ["npm", "start"]
