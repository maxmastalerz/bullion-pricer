FROM node:16.13.0-alpine

WORKDIR /app

COPY ./product-scraper/package.json /app
COPY ./product-scraper/package-lock.json /app

RUN npm ci

COPY ./product-scraper /app

CMD ["npm", "start"]
