import fetchWithLog from "./src";

console.log("BEGIN");
console.log("--------");

const log = args => {
  console.log("Passed func");
  console.log(args);
};

const fetch = new fetchWithLog({ log: log });

(async function init() {
  const result = await fetch("https://www.google.com", {}).catch(e => {
    console.log("ERROR");

    console.log(e);
  });
  console.log(result);

  console.log("COMPLETE");
  console.log("--------");
})();
