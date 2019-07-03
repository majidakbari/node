# Sample node project
This project includes two docker containers based on `node` and `mongo` images.

## Installation guide
Follow these steps to simply run this project.

### Clone the project
Clone this repository to your local machine using the following command
```bash
git clone git@github.com:majidakbari/node.git
```

### Environment variables
Setting up the container (OS) level environment variables.
```bash
cd /path-to-project
cp .env.example .env
vim .env
```


### Running the containers
Open terminal and type the following command:
```bash
docker-compose up -d 
```


## API Documentation
In the src directory of the project there is a postman collection which contains the API doc.
Also you can find the API documentation in the following address.

[API Documentation](https://documenter.getpostman.com/view/1493779/S1a915qe)

## Tests
To run tests, in the terminal type the following command:
```bash

```

## Images/Containers

`app`
node:10.16.0-jessie

`db`
mongo:4.0.10-xenial

## Licence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
