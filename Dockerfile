FROM node:10.21.0-alpine3.10

# Set a working directory
WORKDIR /usr/src/app

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true
RUN npm install pm2 typescript yo generator-botbuilder -g


COPY package.json .
COPY tsconfig.json .
COPY src ./src
COPY .env .
COPY deploymentScripts ./deploymentScripts
COPY deploymentTemplates ./deploymentTemplates

RUN npm i

RUN npm run build

RUN npm prune --production

RUN rm -rf ./src

EXPOSE 3978

CMD ["node", "./lib/index.js"]
