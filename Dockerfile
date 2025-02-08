FROM node:14.17-alpine3.11

RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache python2 py2-pip
RUN npm install -g webpack webpack-cli

WORKDIR /project

EXPOSE 3000