FROM node:16 AS base
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci


FROM base as test-stage

COPY . .

RUN CI=true npm test


FROM test-stage as build-stage

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

RUN npm run build
  
FROM nginx:1.20.1

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Move the default conf out of the way
#RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf_orig 
# Copy in your project's new nginx conf
#COPY ../nginx.conf /etc/nginx/nginx.conf