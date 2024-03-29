# Stage 1: Build the React application
FROM node:20.10.0-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Serve the application using `serve`
FROM node:20.10.0-alpine
WORKDIR /app

COPY --from=build /app/build /app

EXPOSE 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]
