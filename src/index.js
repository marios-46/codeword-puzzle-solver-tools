"use strict";

/**
 * Convert a word into a normalized repeated-letter pattern.
 * Example: NOON -> 0.1.1.0
 */
function letterPattern(word) {
  if (typeof word !== "string" || !/^[a-z]+$/i.test(word)) {
    throw new TypeError("Word must contain letters only.");
  }

  const positions = new Map();
  let nextId = 0;

  return word
    .toUpperCase()
    .split("")
    .map((letter) => {
      if (!positions.has(letter)) {
        positions.set(letter, nextId++);
      }
      return positions.get(letter);
    })
    .join(".");
}

/**
 * Find words with the same repeated-letter pattern.
 */
function candidatesForPattern(cipherPattern, wordList) {
  if (!Array.isArray(wordList)) {
    throw new TypeError("wordList must be an array.");
  }

  const target = letterPattern(cipherPattern);

  return wordList.filter(
    (word) =>
      typeof word === "string" &&
      /^[a-z]+$/i.test(word) &&
      word.length === cipherPattern.length &&
      letterPattern(word) === target
  );
}

/**
 * Filter candidates using known cipher-to-plaintext mappings.
 */
function filterByMapping(cipherPattern, wordList, mapping = {}) {
  if (typeof cipherPattern !== "string" ||
      !/^[a-z]+$/i.test(cipherPattern)) {
    throw new TypeError("Cipher pattern must contain letters only.");
  }

  if (!Array.isArray(wordList)) {
    throw new TypeError("wordList must be an array.");
  }

  const cipher = cipherPattern.toUpperCase();
  const normalizedMapping = {};

  for (const [key, value] of Object.entries(mapping)) {
    if (!/^[a-z]$/i.test(key) || !/^[a-z]$/i.test(value)) {
      throw new TypeError("Mapping keys and values must be single letters.");
    }
    normalizedMapping[key.toUpperCase()] = value.toUpperCase();
  }

  const usedPlainLetters = new Map();

  for (const [cipherLetter, plainLetter] of Object.entries(normalizedMapping)) {
    if (
      usedPlainLetters.has(plainLetter) &&
      usedPlainLetters.get(plainLetter) !== cipherLetter
    ) {
      return [];
    }
    usedPlainLetters.set(plainLetter, cipherLetter);
  }

  return candidatesForPattern(cipher, wordList).filter((word) => {
    const candidate = word.toUpperCase();
    const forward = {};
    const reverse = {};

    for (let i = 0; i < cipher.length; i++) {
      const c = cipher[i];
      const p = candidate[i];

      if (forward[c] && forward[c] !== p) return false;
      if (reverse[p] && reverse[p] !== c) return false;

      forward[c] = p;
      reverse[p] = c;

      if (normalizedMapping[c] && normalizedMapping[c] !== p) {
        return false;
      }
    }

    return true;
  });
}

module.exports = {
  letterPattern,
  candidatesForPattern,
  filterByMapping
};
