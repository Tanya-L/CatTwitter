FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i --production
COPY . .
CMD ["node", "index.js"]