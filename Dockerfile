FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY build build
COPY src src
RUN npm run build
EXPOSE 3200
CMD [ "npm", "start" ]
