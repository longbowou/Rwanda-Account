FROM node:lts

WORKDIR /app

RUN yarn global add @vue/cli

RUN chown node:node -R /app

USER node