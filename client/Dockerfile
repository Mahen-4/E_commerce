FROM node:20-alpine3.17

COPY package.json /app/
COPY src /app/
COPY public /app/

WORKDIR /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]