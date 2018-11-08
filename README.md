
## Table of Contents
- [About](#about)
- [Workflow](#workflow)
- [Folder Structure](#folder-structure)
- [Run local](#run-local)
- [Todo](#todo)


## About
* Fullstack react+redux application that uses SSR to render a weather rotation component. The weather component displays data from different Cities, based on data fetched from yahooapis.com.

[a quick visual of the web-app](readme_imgs/yahoo-component-rotation.gif)


- Functionalities:
  - the weather component is first rendered on server side, the store is updated and downloaded on browser.
  - app make requests to https://query.yahooapis.com/v1  API, every 5secs, to get weather forecast data
  - Weather data is rotating through 3 initial cities
  - More information that is shown are:
    - Forecast for the next 9 days
    - List of the cities that the component rotates through
  - Form component that enables user to add New city

* It is written in reactjs + reduxjs mainly and also:
- eslint with airbnb-config rules
- webpack
- prop-types
- sass

## Workflow

* Init: localhost:3000/
* Server makes request to yahooapis.com to get data for a city, updates the store, renders the weather component and sends them to the browser.
* After the first render on server, the rest calls to the API are made from the client.
* The init state that sended from server is like so:

[INITIAL_STATE on client](readme_imgs/init_state.png)

## Folder structure

The structure of the project is this:
```
server/
  build/
    bundle.js
  node_modules/
  public/
    bundle.js
  src/
    client/
      actions/
        index.js
        types.js
      components/
        Cities.js
        Forecast.js
        Form.js
        style.scss
        Weather.js
      reducers/
        cityReducers.js
        index.js
        weatherReducer.js
      selectors/
        city.selectors.js
        index.js
        weather.selectors.js
      client.js
      Routes.js
    helpers/
      createStore.js
      renderer.js
    index.js
  .eslintrc
  .gitignore
  package-lock.json
  package.json
  webpack.base.js
  webpack.client.js
  webpack.server.js
  README.md
```

## Run local

In order to run localhost we could:

* download/clone the repo to a folder
* execute npm install to install all the dependencies
* we need to create bundle.js for client and server and start webserver
  ```"scripts": {
    "dev": "npm-run-all -p dev:*",
    "dev:server": "nodemon --watch build --exec node build/bundle.js",
    "dev:build-server": "webpack --config webpack.server.js --watch",
    "dev:build-client": "webpack --config webpack.client.js --watch"
  },```

* we can start the scripts separate, like so:
  1. npm run dev:build-server
  2. npm run dev:build-client
  3. npm run dev:server

* we could start all in once like so:
  1. $ npm run dev  // currently that script halts (first time), while there are no bundle.js at all, into the /build & /public.

* open your browser on http://localhost:3000/


## Todo

* add unit tests
* add left/right arrows so to handle the displayed cities.
