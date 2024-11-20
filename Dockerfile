# Use the official Node.js image with version 21.5.0 as the base image
FROM node:21.5.0

# Set the working directory
WORKDIR /app

# Copy the production package from the deploy/prod directory
COPY deploy/prod/ .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]