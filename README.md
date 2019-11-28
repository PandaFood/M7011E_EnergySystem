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
localhost:3000
```
or the API at
```
localhost:3100
```

## Running the tests

To test the entire project, run the `./test.sh all` file in the root folder, 

or to run on seperate projects, run `./test.sh <project>`.


## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* **Jonathan Brorsson** - [Time Report](docs/TIMEREPORT_JONATHAN) - Github user [PandaFood](https://github.com/PandaFood)

* **Gustav Hansson** - [Time Report](docs/TIMEREPORT_GUSTAV) - Github user [97Gushan](https://github.com/97Gushan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

