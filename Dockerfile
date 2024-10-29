# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy only necessary files to install dependencies
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install --loglevel verbose

# Copy the rest of the application source
COPY . ./

# Optional: Run build commands if necessary
# RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy production dependencies and files from build stage
COPY --from=build /app/package.json ./
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/.env .env

# Install nodemon globally for development mode
RUN npm install --loglevel verbose -g nodemon

EXPOSE 4000

# Start the application in development mode
CMD ["npm", "run", "dev"]