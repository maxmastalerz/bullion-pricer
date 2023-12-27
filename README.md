### precious-pricer

Originally this application was made as a group project for 9549/4471 at Western. This repo is a continuation of the project.

### To run locally

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.dev -f docker-compose-dev.yml build

$ docker-compose --env-file .env.dev -f docker-compose-dev.yml up --scale pp-product-scraper=2

Please wait(about 55 seconds for scraping to finish), then:

Go to http://localhost

### Useful Info For Developers:

#### Connecting to local dockerized database:

$ docker exec -it $(docker ps -qf "name=pp-db") mongosh --username root --authenticationDatabase admin preciousPricer

The password is password

preciousPricer> db.products.find()

### To run production build locally with nginx proxy in front

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


### CURRENT TO DO:

Find all the PP-TODO lines
Look into npm ci vs npm install. When to use which. Different envs?
Fix the bordergold parser to get real values
Make proper contact page
Replace spot price calls? Make sure these never fail.
Implement more scrapers
Decide on whether or not to have product images.
etc.

### FUTURE TODO:

Re-enable header links like "Dealer Reviews". Implement them.
Add currency support for spot and product prices.
Deploy app somehow w/ CI/CD.