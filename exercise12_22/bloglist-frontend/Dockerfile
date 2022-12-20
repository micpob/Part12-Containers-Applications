FROM node:16 AS base
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

FROM base as build-stage

COPY . .

RUN npm run build
  
FROM nginx:1.20.1

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html