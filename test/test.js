import autocannon from "autocannon";

async function runLoadTests() {
  /**
   * @function
   * @description Executes load tests on specified routes using autocannon.
   * @returns {Promise<Array>} A promise that resolves to an array of results from the load tests.
   * Each result contains performance metrics for the respective route being tested.
   *
   * @property {Object} results - The results of the load tests.
   * @property {number} results[0].totalHits - Total number of hits for the root route ("/").
   * @property {number} results[1].totalHits - Total number of hits for the route ("/route1").
   *
   * @example
   * const results = await loadTest();
   * console.log(`Total hits for Route 1: ${results[0].totalHits}`);
   * console.log(`Total hits for Route 2: ${results[1].totalHits}`);
   */
  const results = await Promise.all([
    autocannon({
      url: "http://localhost:3002/",
      connections: 10,
      pipelining: 1,
      duration: 30,
      requests: [{ path: "/", method: "GET" }],
    }),
    autocannon({
      url: "http://localhost:3001/proxy",
      requests: [{ path: "/proxy", method: "GET" }],
      connections: 10,
      pipelining: 1,
      duration: 30,
    }),
  ]).then((res) => res.map((r) => ({ totalHits: r.requests.total })));

  console.log(`Total hits for Route 1: ${results[0].totalHits}`);
  console.log(`Total hits for Route 2: ${results[1].totalHits}`);

  console.log("Load tests completed");
  console.log(results);
}

runLoadTests().catch(console.error);
