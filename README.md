# vue2-challenge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```



## Folder Structure
### SERVICE LAYER
**api**
* index - abstraction of axios, implement here HTTP verbs
* serviceCache - cache to load services as they are required
* create a folder per API
* create an instance of API per service and add service instance creation using serviceCache
* services must return a model or a boolean

### VIEW LAYER
**pages**
* add new pages here

**components**
* namespace the components by page if applicable
* helpers are global components

### STORE/MODEL LAYER
**models**
* models of API received data

**hooks**
* create reusable local stores, one instance is created per use

**providers**
* store to transfer data between components, can also be used as a replacement for Vuex

**store**
* Vuex store separated by modules, one folder per module, if module grow too much separate further intro files with getters, actions, mutations

### OTHERS
**plugins**
* add plugins here

**utils**
* add here reusable functions and class which don't belong anywhere else


### Improvements not made

* Add localization for text into files
* Add logging library for API requests
