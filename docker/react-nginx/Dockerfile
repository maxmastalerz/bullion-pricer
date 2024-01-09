#Set up react app
FROM node:16.14.0-alpine as deps
WORKDIR /app/react
COPY ./react/package.json ./

COPY ./react/patches ./patches
RUN npm install

#This line is required due to stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY ./react/ ./

# ------------LOCAL-DEV------------

FROM deps as dev-react
CMD ["./dev-react-entrypoint.sh"]

# --

FROM nginx:stable-alpine as dev-nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/
RUN rm /usr/share/nginx/html/index.html
CMD ["nginx", "-g", "daemon off;"]

# ------------PRODUCTION-----------

FROM deps as build-prod
RUN npm run build-sitemap
RUN npm run build

# --

# Copy React static files and start nginx
FROM nginx:stable-alpine as prod
COPY --from=build-prod /app/react/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
