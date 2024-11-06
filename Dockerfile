# Use the official Node.js image as a base
FROM node:20 AS base
WORKDIR /usr/local/app
# Set environment variables
ENV USE_MEMORY_DB=true \
    DATABASE_URI=mongodb://localhost:27017/notes \
    PORT=3000

# Expose port (the port your backend app listens on)
EXPOSE $PORT

###################################################
# Stage: backend-base
###################################################
FROM base AS backend-base

# Install dependencies
COPY ./backend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy backend code into the container
COPY ./backend .

CMD [ "npm", "run", "start:dev" ]

###################################################
# Stage: backend-dev
###################################################
FROM backend-base AS backend-dev

# Set the default command to run your app
CMD ["npm", "start"]

###################################################
# Stage: build
###################################################
FROM backend-base AS backend-build


# Creates a "dist" folder with the production build
RUN npm run build

CMD ["node", "dist/main.js"]


###################################################
# Stage: final
###################################################
FROM node:20-alpine AS backend-final

# Set environment variables
ENV USE_MEMORY_DB=true \
    DATABASE_URI=mongodb://localhost:27017/notes \
    PORT=3000

# Expose port (the port your backend app listens on)
EXPOSE $PORT

# Creates a "dist" folder with the production build
COPY --from=backend-build /usr/local/app/dist ./dist
COPY --from=backend-build /usr/local/app/node_modules ./node_modules

CMD ["node", "dist/main.js"]