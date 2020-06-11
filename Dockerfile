FROM node:10.21.0-alpine3.10

# Set a working directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm i

COPY ./tsconfig.json .
COPY ./tslint.json .
COPY ./src .
COPY ./env .
COPY ./deploymentScripts .
COPY ./deploymentTemplates .

RUN npm run build

EXPOSE 3978

CMD ['node', './lib/index.js']
