FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 14001

CMD ["sh", "-c", "npm run start & npm run db:seed && wait"]
