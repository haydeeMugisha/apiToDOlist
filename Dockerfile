# Use the official Node.js image
FROM node:21.6.2

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 9010

# Define the command to run the app
CMD ["npm", "start"]
