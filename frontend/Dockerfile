# Stage 1: Build the React application
FROM node:20.10.0-alpine AS build
WORKDIR /app
# Copy dependency files
COPY frontend/package.json frontend/yarn.lock ./ 
# Install dependencies
RUN yarn install  
# Copy the rest of the frontend source code
COPY frontend/ . 
# Build the React application
RUN yarn build  

# Stage 2: Serve the application using `serve`
FROM node:20.10.0-alpine
WORKDIR /app
COPY --from=build /app/build /app
# Expose port 3000
EXPOSE 3000 
# Command to serve the app on port 3000
CMD ["npx", "serve", "-s", ".", "-l", "3000"]
