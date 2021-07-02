# ---------- Base ----------
FROM node:14.16.1 AS base

# install some development tools
RUN apt-get update && apt-get install -y git curl wget gcc g++ make python bzip2

WORKDIR /app
#######################################################################

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder
LABEL maintainer="kareem.mohllal@gmail.com"

# copy package.json package-lock.json and install npm dependicies
COPY package*.json .babelrc ./
RUN npm install

# copy the source files
COPY . .

# build bundle
RUN npm run build

# Remove dev dependencies
RUN npm prune --production
#######################################################################

FROM base AS release
LABEL maintainer="kareem.mohllal@gmail.com"

# set some enviroment variables
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV PORT=3000

# copy the build directory and node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.* ./
COPY --chown=node:node --from=builder /app/dist ./dist

# change the root user for more security
USER node

# expose the application port numbner
EXPOSE $PORT