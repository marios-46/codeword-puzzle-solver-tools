# American–British English Translator

A small JavaScript utility that converts common spelling variants between American and British English. It is a spelling helper, not a complete translation system; word meanings and context can differ between dialects.

## Features

- Convert common American spellings to British spellings.
- Convert supported British spellings to American spellings.
- Preserve basic capitalization.
- No runtime dependencies.

## Installation

After publishing the package to npm:

```bash
npm install codewordsolvers-american-british-english-translator
```

## Usage

```js
const {
  toBritishEnglish,
  toAmericanEnglish
} = require("codewordsolvers-american-british-english-translator");

console.log(toBritishEnglish("My favorite color is gray."));
// My favourite colour is grey.

console.log(toAmericanEnglish("My favourite colour is grey."));
// My favorite color is gray.
```

## API

### `toBritishEnglish(text)`

Converts supported American English spellings to British English.

### `toAmericanEnglish(text)`

Converts supported British English spellings to American English.

Both functions expect a string and throw a `TypeError` for other input types.

## Test

```bash
node test.js
```

## Website

For codeword puzzle-solving resources, visit [CodewordSolvers.uk](https://codewordsolvers.uk/).

## Contributing

Issues and pull requests that improve spelling coverage, tests, and documentation are welcome.

## License

MIT
