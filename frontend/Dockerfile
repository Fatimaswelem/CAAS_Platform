# Stage 1: Build the React/Vite app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Builds the app to the /dist folder
RUN npm run build 

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built assets from Stage 1 to Nginx's default public directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]