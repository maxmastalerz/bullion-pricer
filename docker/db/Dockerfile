FROM mongo
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=localpassword
ENV MONGO_INITDB_DATABASE=pplocaldb

COPY ./init.js /docker-entrypoint-initdb.d/

EXPOSE 27017
