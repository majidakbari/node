FROM node:10.16.0-jessie

LABEL maintainer="Majid Akbari <majidakbariiii@gmail.com>"

RUN mkdir /node

COPY ./ /node

RUN rm -rf /node/app/node_modules

RUN cd /node/app && npm install  && npm run postinstall

RUN npm install -g pm2

WORKDIR /node/app

ENTRYPOINT ["npm", "start"]
