FROM node:20-alpine3.17

COPY package*.json /app/
WORKDIR /app

RUN npm install

COPY . .

CMD ["node", "index.js"]