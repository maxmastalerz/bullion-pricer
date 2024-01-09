### bullion-pricer

Originally this application was made as a group project for 9549/4471 at Western. This repo is a continuation of the project.

### To run locally

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.dev -f docker-compose-dev.yml build

$ docker-compose --env-file .env.dev -f docker-compose-dev.yml up --scale bp-product-scraper=2

Please wait(about 55 seconds for scraping to finish), then:

Go to http://localhost

### Useful Info For Developers:

#### Connecting to local dockerized database:

$ docker exec -it $(docker ps -qf "name=bp-db") mongosh --username root --authenticationDatabase admin bullionPricer

The password is password

bullionPricer> db.products.find()

### To run production build locally with nginx proxy in front

To deploy a production build, you will need a mongodb database already deployed on the cloud.

Please copy the `.env.prod.template` file and name it `.env.prod`

Go into this file and update the following variables:

- API_MONGODB_CONNECTION_STRING
- DB_MONGO_INITDB_ROOT_USERNAME
- DB_MONGO_INITDB_ROOT_PASSWORD

Please ask a group member for credentials to fill in the variables above.

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.prod -f docker-compose-prod.yml build

$ docker-compose --env-file .env.prod -f docker-compose-prod.yml up --scale bp-product-scraper=2

Go to http://localhost

### For production deployment on digital ocean.

Just spin up a droplet, clone your repo onto it and run the docker-compose commands. Only difference is,

- docker-compose up should be run with a -d flag so you can exit your ssh connection without shutting down the website.

- If you're on a small server like 1GB, add some swap space like so to prevent npm/yarn install and npm run build failing.

https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04

### CURRENT TO DO:

Find all the BP-TODO lines
Look into npm ci vs npm install. When to use which. Different envs?
Implement more scrapers
Decide on whether or not to have product images.
etc.

### FUTURE TODO:

Re-enable header links like "Dealer Reviews". Implement them.
Deploy app somehow w/ CI/CD.