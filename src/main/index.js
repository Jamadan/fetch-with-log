import fetch from "fetch";

class FetchLog {
  constructor(args) {
    this.log = args.log;
  }

  async fetchWithLog(url, options, consoleLog = false) {
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
      console.log("SOMETHING WENT WRONG IN PACKAGE");
      throw e;
    }
  }
}

export default FetchLog;
