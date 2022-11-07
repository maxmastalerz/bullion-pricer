FROM node:16.13.0-alpine

WORKDIR /app

COPY ./server/package.json /app
COPY ./server/package-lock.json /app

RUN npm ci

COPY ./server /app

EXPOSE 3000
CMD ["npm", "start"]
