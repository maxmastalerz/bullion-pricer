
# The first stage
# Build React static files
FROM node:16.13.0-alpine as deps
WORKDIR /app/react
COPY ./react/package.json ./
COPY ./react/package-lock.json ./
RUN npm ci

#This line is required due to stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY ./react/ ./

# ----------------

FROM deps as dev-react
CMD npm run start

# --

FROM nginx:stable-alpine as dev-nginx
COPY ./docker/react-nginx/default.conf /etc/nginx/conf.d/
RUN rm /usr/share/nginx/html/index.html
CMD ["nginx", "-g", "daemon off;"]

# ----------------

FROM deps as build-prod
RUN npm run build

# --

# Copy React static files and start nginx
FROM nginx:stable-alpine as prod
COPY --from=build-prod /app/react/build /usr/share/nginx/html
COPY ./docker/react-nginx/default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
