FROM node:16 as base
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]
COPY ./src ./src
RUN npm ci
CMD npm run dev
