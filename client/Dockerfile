FROM node:alpine

RUN mkdir -p /app/client

WORKDIR /app/client
COPY package.json /app/client/package.json
RUN yarn install

COPY . /app/client

EXPOSE 3000

CMD ["yarn", "start"]