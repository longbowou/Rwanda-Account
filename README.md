# Rwanda Account Frontend
VueJs based frontend project for Web freelances services 

## Development setup with docker
### Build container
```
docker-compose build
```
### Install dependencies
```
docker-compose run --rm app yarn
```

### Run Development
```
docker-compose up 
```

## Production setup with docker
### Build container
```
docker-compose build
```

### Install dependencies
```
docker-compose run --rm app yarn
```

### Compiles and minifies for production
```
docker-compose run --rm app yarn build
```

### Run production
```
docker-compose -f prod.docker-compose.yml up 
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
