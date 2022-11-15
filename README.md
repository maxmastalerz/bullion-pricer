# precious-pricer
Group Project for 9549/4471

### To run locally ( THIS SECTION IS FOR THE PROF / TA ):

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.dev -f docker-compose-dev.yml build

$ docker-compose --env-file .env.dev -f docker-compose-dev.yml up

Please wait(about 20 seconds), then:

Go to http://localhost

### Useful Info For Developers:

#### Connecting to local dockerized database:

$ docker exec -it $(docker ps -aqf "name=pp-db") mongosh --username root --authenticationDatabase admin preciousPricer

The password is password

test> use preciousPricer

### To run production build locally with nginx proxy in front (NOT FOR PROF / TA as you don't have production credentials):

To deploy a production build, you will need a mongodb database already deployed on the cloud.

Please copy the `.env.prod.template` file and name it `.env.prod`

Go into this file and update the following variables:

- API_MONGODB_CONNECTION_STRING
- DB_MONGO_INITDB_ROOT_USERNAME
- DB_MONGO_INITDB_ROOT_PASSWORD

Please ask a group member for credentials to fill in the variables above.

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.prod -f docker-compose-prod.yml build

$ docker-compose --env-file .env.prod -f docker-compose-prod.yml up

Go to http://localhost