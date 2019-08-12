FROM node:10

WORKDIR /usr/src/app

COPY build ./build

RUN npm install -g serve

RUN cd /usr/src/app

RUN ls

CMD serve -s build 