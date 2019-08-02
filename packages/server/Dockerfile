FROM node:10


WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

RUN cd /usr/src/app

CMD npm start