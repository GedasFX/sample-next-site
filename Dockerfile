FROM node:lts-alpine AS build
WORKDIR /build

# Install dependencies and cache the result.
COPY package.json .
COPY yarn.lock .
RUN [ "yarn" ]

# Copy the source files and build the program.
COPY . .
RUN [ "yarn", "build" ]


FROM node:lts-alpine AS prod
WORKDIR /app

# Enable production optimizations
ENV NODE_ENV=production

# Copy the files required for rendering.
COPY --from=build /build/package.json .
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

# Install ONLY the packages needed for SSR.
# For example, if using mysql2, add it here.
RUN [ "yarn", "--no-lockfile", "add", "next", "react", "react-dom" ]

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]