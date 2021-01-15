FROM node:lts-alpine AS node_modules
WORKDIR /build

# Install ONLY the packages needed for SSR.
# For example, if using mysql2 on the server side, add it here.
RUN [ "yarn", "add", "next@10.0.5", "react@17.0.1", "react-dom@17.0.1" ]


FROM node:lts-alpine AS build
WORKDIR /build

COPY package.json .
COPY yarn.lock .

# Copy the node_modules needed from production to speed up the installation 
# and then install the rest of the dependencies needed for the build.
COPY --from=node_modules /build/node_modules ./node_modules
RUN [ "yarn" ]

# Copy the source files and build the program.
COPY . .
RUN [ "yarn", "build" ]


FROM node:lts-alpine AS prod
WORKDIR /app

# Enable production optimizations
ENV NODE_ENV=production

# Copy the files required for rendering.
COPY package.json .
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=node_modules /build/node_modules ./node_modules

EXPOSE 3000
ENTRYPOINT [ "yarn", "start" ]