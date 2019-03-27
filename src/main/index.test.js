import fetchWithLog from './';

const originalFetch = fetch;

describe('fetchWithLog', () => {
  it('returns function', () => {
    const testLog = () => {};
    const fetch = fetchWithLog({ log: testLog });

    expect(typeof fetch).toEqual('function');
  });

  it('throws if log not supplied', () => {
    try {
      fetchWithLog();
    } catch (e) {
      expect(e).toEqual(
        new TypeError("Cannot read property 'log' of undefined")
      );
    }
  });

  describe('fetch', () => {
    it('returns same as fetch', async () => {
      const testLog = () => {};

      const fetch = fetchWithLog({ log: testLog });
      let fetchResult = await originalFetch('https://www.google.com');
      let fetchWithLogResult = await fetch('https://www.google.com');

      expect(fetchResult.status).toEqual(fetchWithLogResult.status);

      let fetchError;
      let fetWithLogError;
      try {
        fetchResult = await originalFetch('www.google.com');
      } catch (ex) {
        fetchError = ex;
      }

      try {
        fetchWithLogResult = await fetch('www.google.com');
      } catch (ex) {
        fetWithLogError = ex;
      }

      expect(fetchError).toEqual(fetWithLogError);
    });

    it('logs to function', async () => {
      const testLog = jest.fn();

      const fetch = fetchWithLog({ log: testLog });
      await fetch('https://www.google.com');

      expect(testLog).toHaveBeenCalled();
    });

    it('logs to console if true', async () => {
      const testLog = jest.fn();
      const testConsoleLog = jest.fn();
      console.log = testConsoleLog;
      const fetch = fetchWithLog({ log: testLog });
      await fetch('https://www.google.com', {}, true);

      expect(testLog).toHaveBeenCalled();
      expect(testConsoleLog).toHaveBeenCalledTimes(4);
    });

    it('logs to console if true with error', async () => {
      const testLog = jest.fn();
      const testConsoleLog = jest.fn();
      console.log = testConsoleLog;
      const fetch = fetchWithLog({ log: testLog });

      try {
        await fetch('www.google.com', {}, true);
      } catch (ex) {
        // do nothing
      }

      expect(testConsoleLog).toHaveBeenCalledTimes(1);
    });
  });
});
