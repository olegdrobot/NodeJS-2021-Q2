FROM node:15.3.0-alpine
WORKDIR user/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]