
# We use Node 20 Alpine — small and fast
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (Docker cache optimization)
# If package.json didn't change, Docker won't reinstall dependencies
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# The port our Express app listens on
EXPOSE 3000

# Start the server
CMD ["node", "src/index.js"]
