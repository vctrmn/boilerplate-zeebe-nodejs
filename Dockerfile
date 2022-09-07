# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY .eslintrc.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npx eslint . --fix && npx tsc -p . 

# Stage 2: Running the build
FROM node:16-alpine AS app
WORKDIR /app
COPY package*.json ./
RUN npm ci --production && npm cache clean --force && npm prune --production
COPY --from=builder /app/dist ./
EXPOSE 5000
# Run the container with a non-root User
USER node
CMD [ "node", "index.js" ]