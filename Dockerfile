FROM node: 14.17-alpine
WORKDIR user/app
COPY ["package.json", "package-lock.json*"]
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]