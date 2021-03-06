
#
# Yarn cache & Docker
# https://github.com/yarnpkg/yarn/issues/749
#
# Multi-stage build
# https://codefresh.io/docker-tutorial/node_docker_multistage/


# Add this point, the project as already been tested & linted in CircleCI, our goal then is only to build & deploy.

# `dist` & `node_modules` must be present locally

# COPY uses local file system, so we can leverage CircleCI's built files instead of building in Docker

# RUN acts on docker layer, not filesystem

# NODE_ENV=production ignores devDependencies

#
# [1] ---- Base Node ----
#
FROM node:14.8.0-alpine AS base

#
# ---- Machine Deps ----

RUN apk add \
  bash

RUN yarn global add pm2

# Set variables
#
# https://stackoverflow.com/questions/39597925/how-do-i-set-environment-variables-during-the-build-in-docker
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# ARG CI=true
# ENV CI=$CI

# circleci docker remote docker can't access local files
# need to copy from local workspace to ad hoc container volume
# then build docker image with that volume mounted here

WORKDIR /home/codelab/app

COPY . ./
# COPY node_modules ./node_modules
# COPY package.json ./
# COPY dist/apps ./dist/apps
# COPY config ./config
# COPY scripts/start.sh ./scripts/

RUN ls

# RUN ./scripts/install.sh

# #
# # [2] ---- Project Deps ----
# #
# FROM base AS dependencies

# # # install prod only
# # RUN yarn --pure-lockfile --prod

# # # copy but exclude nrwl .cache from prod
# # RUN cp -R node_modules ./node_modules_prod

# # # install prod + dev, override NODE_ENV=production
# # RUN yarn --pure-lockfile --production=false

# #
# # [3] ---- Build App ----
# #
# FROM dependencies AS build

# RUN ls

# RUN yarn build

# #
# # [4] ---- Release ----
# #
# FROM base AS release

# # we copied prod depds to separate folder earlier
# COPY --from=dependencies /codelab/node_modules_prod ./node_modules
# COPY --from=build /codelab/dist ./dist

# Expose the listening port
EXPOSE 3333 4200

# # Run container as non-root (unprivileged) user
# # The node user is provided in the Node.js Alpine base image
# #USER node

# ENTRYPOINT ["pm2", "startOrReload", "config/pm2.json"]
ENTRYPOINT ["pm2-runtime", "config/pm2.json"]
