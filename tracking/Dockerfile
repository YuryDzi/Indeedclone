FROM node:16-alpine

ENV NODE_ENV development

WORKDIR /app

COPY . .
RUN npm install

USER node
CMD ["npm", "start"]