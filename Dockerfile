# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copy only package files to leverage caching
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . ./

# Run build commands if necessary (skip if not needed)
# RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/tsconfig.json /app/tsconfig.json
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/src /app/src
COPY --from=build /app/.env /app/.env

# Install nodemon globally
RUN npm install -g nodemon

EXPOSE 4000

# Run the application
CMD ["npm", "run", "dev"]
