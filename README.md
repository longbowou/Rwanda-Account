# Metronic Vue

## Production setup with docker
### Build container
```
docker-compose build
```

### Compiles and minifies for production
```
docker-compose run --rm app yarn build
```

### Run production
```
docker-compose -f prod.docker-compose.yml up 
```

## Development setup with docker
### Build container
```
docker-compose build
```

### Run Development
```
docker-compose up 
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
