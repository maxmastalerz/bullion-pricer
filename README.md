# precious-pricer
Group Project for 9549/4471

### To run locally:

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.dev -f docker-compose-dev.yml build

$ docker-compose --env-file .env.dev -f docker-compose-dev.yml up

Please wait(about 20 seconds), then:

Go to http://localhost

### To run production build locally with nginx proxy in front:

Note: For now we are using the same env file that we're using for dev.

$ DOCKER_BUILDKIT=1 docker-compose --env-file .env.dev -f docker-compose-prod.yml build

$ docker-compose --env-file .env.dev -f docker-compose-prod.yml up

Go to http://localhost