# Use the official Node.js image as a base
FROM node:lts-slim

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Copy the rest of the application code
COPY . .

# Expose the necessary ports
EXPOSE 3000
EXPOSE 3001

# Start the application
CMD ["sh", "-c", "yarn nx run-many --target=serve --all"]
