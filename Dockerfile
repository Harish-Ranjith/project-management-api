# A lightweight Node.js image
FROM node:18-alpine

# Setting the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app using nodemon (for development)
CMD ["npx", "nodemon", "app.js"]