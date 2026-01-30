FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la 

EXPOSE 5002

CMD [ "npm","start" ]