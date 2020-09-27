FROM node:12
WORKDIR /src/product_api
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]