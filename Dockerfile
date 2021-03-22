FROM node:14.16.0-alpine3.10
WORKDIR /home/node/app/js
COPY . .
RUN npm install
USER node