# Codeword Puzzle Pattern Helper

A lightweight JavaScript utility for narrowing down possible codeword puzzle answers using repeated-letter patterns and known letter mappings.

This package is a helper for puzzle solvers, not a complete online solver. It works with a word list that you supply.

## Features

- Match a codeword's repeated-letter pattern against candidate words.
- Filter candidates using known cipher-letter-to-answer-letter mappings.
- Check one-to-one letter mapping rules.
- No runtime dependencies.

## Installation

After publishing the package to npm:

```bash
npm install codewordsolvers-puzzle-pattern-helper
```

## Usage

```js
const {
  letterPattern,
  candidatesForPattern,
  filterByMapping
} = require("codewordsolvers-puzzle-pattern-helper");

const words = ["noon", "moon", "tree", "else", "area"];

console.log(letterPattern("ABBA"));
// "0.1.1.0"

console.log(candidatesForPattern("ABBA", words));
// ["noon"]

console.log(filterByMapping("ABCD", words, { A: "T" }));
// Candidates whose first letter is T, respecting one-to-one letter mapping.
```

## API

### `letterPattern(word)`

Returns a normalized repeated-letter pattern. For example, `NOON` becomes `0.1.1.0`.

### `candidatesForPattern(cipherPattern, wordList)`

Returns words that have the same length and repeated-letter structure as the supplied codeword pattern.

### `filterByMapping(cipherPattern, wordList, mapping)`

Filters candidates against known mappings. Mapping keys represent cipher letters and values represent plaintext letters, such as `{ A: "T", B: "E" }`. Each cipher letter must map consistently to one plaintext letter, and two cipher letters cannot map to the same plaintext letter.
### Additional Codeword Solving Resource

Looking for an online tool to help with British codeword puzzles? Visit [Codeword Solvers UK](https://codewordsolvers.uk/) for codeword-solving assistance and puzzle-solving resources.
## Run tests

```bash
npm test
```

## Related resource

For codeword puzzle-solving resources, visit [CodewordSolvers.uk](https://codewordsolvers.uk/).

## Limitations

- Results depend on the word list you provide.
- This package does not scrape websites, access private data, or guarantee a puzzle answer.
- English spelling, word variants, and proper nouns depend on the chosen word list.

## License

MIT
