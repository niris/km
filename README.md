#  Knowledge Management

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Docker

```bash
docker build -t km .
docker-compose up -d
```

# Mongo backup/restore

Place any mongo dump in the project `/db/dump` folder

```bash
MONGO_ID=$(docker ps | grep mongo | awk '{print $1}')
docker exec -ti $MONGO_ID /usr/bin/mongorestore /data/db/dump -u root -p example
docker exec -ti $MONGO_ID /usr/bin/mongodump -o /data/db/dump -u root -p example
```