
FROM node:latest
WORKDIR /app
COPY ./package.json /app
RUN npm config set registry https://mirrors.cloud.tencent.com/npm/ && npm install
COPY . /app
EXPOSE 3000
CMD prisma generate && node ./src/index.mjs



