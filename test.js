const assert = require("node:assert/strict");
const {
  letterPattern,
  candidatesForPattern,
  filterByMapping
} = require("./src");

assert.equal(letterPattern("NOON"), "0.1.1.0");
assert.equal(letterPattern("ELSE"), "0.1.2.0");
assert.deepEqual(
  candidatesForPattern("ABBA", ["noon", "moon", "tree", "else", "area"]),
  ["noon"]
);
assert.deepEqual(
  filterByMapping("ABCD", ["taco", "tend", "toad"], { A: "T" }),
  ["taco", "tend", "toad"]
);
assert.deepEqual(
  filterByMapping("ABBA", ["noon", "moon", "tree"], { A: "N" }),
  ["noon"]
);
assert.throws(() => letterPattern("word!"), TypeError);
console.log("All tests passed.");
