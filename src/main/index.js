require("es6-promise").polyfill();
require("isomorphic-fetch");

export default args => {
  const { log } = args;

  return async (url, options, consoleLog = false) => {
    try {
      const startTime = Date.now();
      const res = await fetch(url, options);

      const endTime = Date.now();
      log({ url, options, res, time: endTime - startTime });
      if (consoleLog) {
        console.log(`url: ${url}`);
        console.log(`options: ${options}`);
        console.log(`res: ${res}`);
        console.log(`time: ${endTime - startTime}`);
      }
      return res;
    } catch (e) {
      if (consoleLog) {
        console.log("ERROR CAUGHT IN FETCH WITH LOG");
      }
      throw e;
    }
  };
};
