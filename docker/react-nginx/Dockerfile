#Set up react app
FROM node:16.14.0-alpine as deps

#This workaround is needed as production was unable to get the react env variable another way.
ARG REACT_APP_HCAPTCHA_SITE_KEY
ENV REACT_APP_HCAPTCHA_SITE_KEY=$REACT_APP_HCAPTCHA_SITE_KEY

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
COPY ./nginx/nginx-with-certcheck.sh /usr/sbin
RUN chmod +x /usr/sbin/nginx-with-certcheck.sh
COPY ./nginx/default.conf /etc/nginx/conf.d/
RUN rm /usr/share/nginx/html/index.html
ENTRYPOINT ["/usr/sbin/nginx-with-certcheck.sh"]

# ------------PRODUCTION-----------

FROM deps as build-prod
RUN npm run build-sitemap
RUN npm run build

# --

# Copy React static files and start nginx
FROM nginx:stable-alpine as prod
COPY ./nginx/nginx-with-certcheck.sh /usr/sbin
RUN chmod +x /usr/sbin/nginx-with-certcheck.sh
COPY --from=build-prod /app/react/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/
ENTRYPOINT ["/usr/sbin/nginx-with-certcheck.sh"]