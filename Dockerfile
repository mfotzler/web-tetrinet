FROM node:18-alpine

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN cd /app && npm install

COPY ./server/package.json ./server/
COPY ./server/package-lock.json ./server/
RUN cd /app/server && npm install

COPY . .
RUN npx tsc

CMD ["node", "./server/proxy.js", "--tetrinet-host", "play.tetrinet.xyz"]
