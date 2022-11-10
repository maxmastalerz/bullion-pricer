FROM node:16.13.0-alpine

WORKDIR /app

COPY ./api/package.json /app
COPY ./api/package-lock.json /app

RUN npm ci

COPY ./api /app

CMD ["npm", "start"]
