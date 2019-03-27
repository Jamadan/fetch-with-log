import fetchWithLog from "./";

describe("fetchWithLog", () => {
  it("returns function", () => {
    const testLog = () => {};
    const fetch = fetchWithLog({ log: testLog });

    expect(typeof fetch).toEqual("function");
  });
  it("throws if log not supplied", () => {
    const testLog = () => {};

    try {
      const fetch = fetchWithLog();
    } catch (e) {
      expect(e).toEqual(
        new TypeError("Cannot read property 'log' of undefined")
      );
    }
  });
});
