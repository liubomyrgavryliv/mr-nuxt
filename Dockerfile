FROM node:14.15.5-alpine

# create destination directory
RUN mkdir -p /mr-nuxt
WORKDIR /mr-nuxt

# copy the app, note .dockerignore
COPY . /mr-nuxt/

# update and install dependency
RUN apk update && apk upgrade

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


# expose 8080 on container
EXPOSE 8080

# build is necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build