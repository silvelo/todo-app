# Use the official Node.js image as a base
FROM node:20 AS base
WORKDIR /usr/local/app

###################################################
# Stage: client-base
###################################################
FROM base AS client-base

# Install dependencies
COPY package*.json .

RUN npm install --legacy-peer-deps

# Copy client code into the container
COPY . .

###################################################
# Stage: client-dev
###################################################
FROM client-base AS client-dev

# Set the default command to run your app
CMD ["npm", "start"]

###################################################
# Stage: build
###################################################
FROM client-base AS client-build

# Creates a "dist" folder with the production build
RUN npm run build --prod


###################################################
# Stage: final
###################################################
FROM nginx:1.27 AS client-final

# Creates a "dist" folder with the production build
COPY --from=client-build /usr/local/app/dist/client/browser ./usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

