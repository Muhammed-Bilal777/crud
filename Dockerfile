# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN yarn install

# Copy remaining source files
COPY . .

RUN yarn cache clean
# Build TypeScript
RUN yarn run build

# Expose port
EXPOSE 4000

# Start the server
CMD ["node", "dist/src/index.js"]


