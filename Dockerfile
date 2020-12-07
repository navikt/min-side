FROM node:14 AS builder

WORKDIR /usr/src/app

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

COPY package*.json /usr/src/app/
RUN npm ci

COPY . /usr/src/app
ENV NODE_ENV=production

FROM node:14-alpine AS runtime

WORKDIR /usr/src/app

ARG BASE_PATH
ENV PORT=7000 \
    NODE_ENV=production \
    BASE_PATH=$BASE_PATH

COPY package*.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app

EXPOSE 7000
USER node

CMD ["npm", "run", "layout"]

