FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY index.js .
COPY .env .
COPY /src ./src

RUN mkdir uploaded
RUN npm i -g yarn
RUN yarn install

ENV NODE_ENV development

EXPOSE 3005

# CMD [ "node" ]