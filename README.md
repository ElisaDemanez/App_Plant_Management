# pwa_plant_management

> A personnal project. I'm trying to develop a plant managing simple application for my own need(a PWA is the super ambitious goal. )

I first want to be able to order them by species. A plant could have different attributes : Seller, date of purchase, sub species name. Each of them has a unique ID in order to be able to write it on their label, and find their complementary infos easily.
Since I mainly have succulents, later on I'd like to be able to sort them by frost resistance and exposure, allowing me to put plants together more easily. 


## Installation : 

After you've cloned it, you need your own firebase database in order to try it. 
in /src/components/ replace firebase.template.js by firebase.js and fill your infos. 
Then npm install and npm run dev
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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
