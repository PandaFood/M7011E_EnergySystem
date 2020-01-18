# Project in Design of Dynamic web systems

This repository is for the course M7011E at Luleå tekniska universitet.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The prerequisites for this project is
- NodeJS  - https://nodejs.org/en/
- NPM     - https://www.npmjs.com/get-npm
- Docker  - https://www.docker.com/


### Installing

To initiate all the dockers, use

```
docker-compose up
```

To run them in deamon mode, run
```
docker-compose up -d
```

You can then connect to the website at 
```
localhost
```

## Running the tests

The tests on the simulator can be run by doing 
``` npm test ``` in the simulator folder.

## Deployment

For deploying in production, generate the new frontend by running ´´´ npm run build ´´´ in the Frontend folder.

## Authors

* **Jonathan Brorsson** - [Time Report](docs/TIMEREPORT_JONATHAN) - Github user [PandaFood](https://github.com/PandaFood)

* **Gustav Hansson** - [Time Report](docs/TIMEREPORT_GUSTAV) - Github user [97Gushan](https://github.com/97Gushan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

