# pwa_plant_management

A personnal project. 
A plant can have different attributes : Seller, species and subspecies name,informations,and pictures. Each of them has a unique ID in order to be able to write it on their label, and find their complementary infos easily. You can manage the pictures of each of the plants in order to keep track of their evolutions.
You can sort them by : Id, frost resistance, and exposure. 
Since I mainly have succulents,those criterias allows me to put plants together more easily. 
There is also a search bar on the id and full name. 

## Installation : 

After you've cloned it, you need your own firebase database in order to try it. 
in /src/components/ replace firebase.template.js by firebase.js and fill your infos. 
Then ``` npm install``` , ``` npm run dev``` 
and go to http://localhost:3001/#/
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
