FROM node:8.11.2-alpine as node

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build