FROM node:16 AS base
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci


FROM base as test-stage

COPY . .

RUN CI=true npm test


FROM test-stage as build-stage

COPY . .

ENV REACT_APP_BACKEND_URL=HTTP://localhost:3000

RUN npm run build
  
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html