# Step 1: Use Node.js image to build the Angular application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire Angular project to the container
COPY . .

# Set the OpenSSL legacy provider to resolve the ERR_OSSL_EVP_UNSUPPORTED issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the Angular application
RUN npm run build --prod

# Step 2: Use an Nginx image to serve the built application
FROM nginx:alpine

# Replace <your-angular-project> with the actual folder name inside /dist
COPY --from=build /app/dist/login-app/ /usr/share/nginx/html/

# Expose port 80 to serve the application
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
