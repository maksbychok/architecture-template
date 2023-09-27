FROM node:10

WORKDIR /app

RUN npm install pm2 -g

COPY ./package.json .
#COPY ./package-lock.json .

RUN npm install
RUN npm install --package-lock-only

COPY . .

EXPOSE 3000

CMD npm pm2-start-dev