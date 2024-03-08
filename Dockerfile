# Use the official Node.js image with the specified version
FROM node:18.19.1
# Set working directory
WORKDIR /app


# Copy package.json and to the working directory
COPY package.json ./

# Install npm globally
RUN npm install 

# Copy the rest of the application code
COPY . .

# Command to run your application
CMD ["npm", "start"]

