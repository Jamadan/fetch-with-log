import fetchWithLog from "./src";
// OR
// const fetchWithLog = require('fetch-with-log').default;

console.log("BEGIN");
console.log("--------");

const log = args => {
  // do logging magic here
  // args are this shape:
  // {
  //   url, // url requested
  //   options, // request options passed
  //   res, // response object
  //   time; // time taken to make fetch request
  // }

  // UNCOMMENT HERE TO PRINT ARGS
  // console.log(args);

  console.log("Passed log function");
};

const fetch = fetchWithLog({ log });

(async function init() {
  const result = await fetch("https://www.google.com", {}).catch(e => {
    console.log("ERROR");
    console.log(e);
  });
  // console.log(result);

  console.log("COMPLETE");
  console.log("--------");
})();
