FROM node:alpine

RUN mkdir -p /app/api

WORKDIR /app/api
COPY package.json ./package.json
RUN yarn install

COPY . /app/api

EXPOSE 8080

CMD ["yarn", "start"]