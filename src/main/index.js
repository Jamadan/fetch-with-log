import es6 from "es6-promise";
es6.polyfill();
import "isomorphic-fetch";

class FetchLog {
  constructor(args) {
    this.log = args.log;
  }

  async fetch(url, options, consoleLog = false) {
    const startTime = Date.now();
    try {
      const res = await fetch(url, options);

      const endTime = Date.now();
      this.log({ url, options, res, time: endTime - startTime });
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
  }
}

export default FetchLog;
