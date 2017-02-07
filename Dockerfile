FROM node:6.9.5-alpine

RUN echo -e 'http://dl-cdn.alpinelinux.org/alpine/edge/main\nhttp://dl-cdn.alpinelinux.org/alpine/edge/community\nhttp://dl-cdn.alpinelinux.org/alpine/edge/testing' > /etc/apk/repositories

RUN apk add yarn --no-cache

ENV INSTALL_PATH /opt
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package.json yarn.lock ./
RUN yarn

ENV NODE_ENV production
ENV PATH $PATH:/opt/node_modules/.bin
ENV PORT 5000

COPY . ./

RUN yarn build

EXPOSE 5000
CMD yarn start
