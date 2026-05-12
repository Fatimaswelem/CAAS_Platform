# Stage 1: Build the React/Vite app
FROM node:22-alpine AS build
WORKDIR /app

# Look inside the CAAS-Engine folder for the package files
COPY CAAS-Engine/package*.json ./
RUN npm install

# Copy the rest of the React app from inside CAAS-Engine
COPY CAAS-Engine/ .
RUN npm run build 

# Stage 2: Serve with Nginx and configure Reverse Proxy
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Overwrite the default Nginx config to route /api traffic to the backend
RUN echo $'server { \n\
    listen 80; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
    location /api/ { \n\
        proxy_pass http://backend:8080/api/; \n\
        proxy_set_header Host $host; \n\
        proxy_set_header X-Real-IP $remote_addr; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]