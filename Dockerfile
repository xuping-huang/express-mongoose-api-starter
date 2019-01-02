# use node 10 lastest stable version
# use slim image - only contains the minimal packages needed to run node
FROM node:10-slim

WORKDIR /starter
ENV NODE_ENV development
COPY package.json /starter/package.json

# Use not in China
# Install package only in dependencies
# RUN npm install --production

# Use in China network
# Install package only in dependencies
RUN npm install cnpm -g
RUN cnpm install --production

COPY .env /starter/.env
COPY . /starter

CMD ["npm","start"]

EXPOSE 80
