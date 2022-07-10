FROM node:16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install --legacy-peer-deps
RUN npm install react-scripts@5.0.1 -g --legacy-peer-deps

COPY . ./

CMD ["npm", "start"]