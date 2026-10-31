const assert = require("node:assert/strict");
const { toBritishEnglish, toAmericanEnglish } = require("./src");

assert.equal(toBritishEnglish("My favorite color is gray."), "My favourite colour is grey.");
assert.equal(toAmericanEnglish("My favourite colour is grey."), "My favorite color is gray.");
assert.equal(toBritishEnglish("ORGANIZE the center"), "ORGANISE the centre");
assert.equal(toAmericanEnglish("The theatre is colourful."), "The theater is colorful.");
console.log("All tests passed.");
