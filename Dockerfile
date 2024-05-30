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

# Copy the wait-for-it.sh script into the Docker image
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the port the app runs on
EXPOSE 9010

# Define the command to run the app
# Update the CMD to use wait-for-it.sh
CMD ["./wait-for-it.sh", "mysql-todo:3306", "--", "npm", "start"]
