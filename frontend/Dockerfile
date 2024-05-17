FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY frontend/package.json frontend/yarn.lock ./ 
RUN yarn install  
COPY frontend/ . 
RUN yarn build  

# Stage 2: Serve the application using `serve`
FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app/build /app
EXPOSE 3000 
CMD ["npx", "serve", "-s", ".", "-l", "3000"]

