FROM node:alpine

# set working directory
WORKDIR /client

ENV PATH ../client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm install --save moment react-moment
RUN npm install react-datepicker --save
RUN npm install redux react-redux


# add app
COPY . ./

# start app
CMD ["npm", "start"]