# fetch-with-log

Creates a function which logs request and response from fetch into passed in function

# Installation

npm install fetch-with-log

# Usage example

```javascript
import fetchWithLog from 'fetch-with-log');
// OR
// const fetchWithLog = require('fetch-with-log').default;

const logFunc = args => {
  // do logging magic here
  // args are this shape:
  // {
  //   url, // url requested
  //   options, // request options passed
  //   res, // response object
  //   time; // time taken to make fetch request
  // }

  console.log('some log to analytics for example');
};

const fetch = fetcher({ log: logFunc });

(async function init() {
  const result = await fetch('https://www.google.com', {}).catch(e => {
    console.log(e);
  });
})();
```
