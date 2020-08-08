FROM node:8-slim

WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "test"]