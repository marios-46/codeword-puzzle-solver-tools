/**
 * Codeword Puzzle Pattern Helper
 * Website: https://codewordsolvers.uk/
 *
 * This library filters a supplied word list by word shape and known
 * cipher-to-plaintext letter mappings. It does not fetch answers online.
 */

/**
 * Returns the repeated-letter pattern for a word.
 * Examples: "NOON" -> "0.1.1.0"; "ELSE" -> "0.1.2.0".
 */
function letterPattern(word) {
  if (typeof word !== "string" || !/^[a-z]+$/i.test(word)) {
    throw new TypeError("word must contain letters only.");
  }

  const seen = new Map();
  let nextId = 0;

  return word.toUpperCase().split("").map(letter => {
    if (!seen.has(letter)) seen.set(letter, nextId++);
    return seen.get(letter);
  }).join(".");
}

/**
 * Filters words with the same repeated-letter structure as a codeword.
 * Example: candidatesForPattern("ABBA", ["NOON", "TREE", "MOON"])
 * returns ["NOON"].
 */
function candidatesForPattern(cipherPattern, wordList) {
  if (typeof cipherPattern !== "string" || !/^[a-z]+$/i.test(cipherPattern)) {
    throw new TypeError("cipherPattern must contain letters only.");
  }
  if (!Array.isArray(wordList)) {
    throw new TypeError("wordList must be an array of words.");
  }

  const target = letterPattern(cipherPattern);
  const length = cipherPattern.length;

  return wordList.filter(word =>
    typeof word === "string" &&
    /^[a-z]+$/i.test(word) &&
    word.length === length &&
    letterPattern(word) === target
  );
}

/**
 * Filters candidate words using known cipher-letter -> plain-letter mappings.
 * Mapping keys and values are single letters, e.g. { A: "T", B: "E" }.
 * Mapping is one-to-one: two cipher letters cannot map to the same plain letter.
 */
function filterByMapping(cipherPattern, wordList, mapping = {}) {
  if (typeof cipherPattern !== "string" || !/^[a-z]+$/i.test(cipherPattern)) {
    throw new TypeError("cipherPattern must contain letters only.");
  }
  if (!Array.isArray(wordList)) {
    throw new TypeError("wordList must be an array of words.");
  }
  if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) {
    throw new TypeError("mapping must be an object.");
  }

  const normalized = {};
  const usedPlainLetters = new Map();

  for (const [cipher, plain] of Object.entries(mapping)) {
    if (!/^[a-z]$/i.test(cipher) || typeof plain !== "string" || !/^[a-z]$/i.test(plain)) {
      throw new TypeError("Each mapping must be a single letter to a single letter.");
    }
    const c = cipher.toUpperCase();
    const p = plain.toUpperCase();

    if (normalized[c] && normalized[c] !== p) {
      throw new Error(`Cipher letter ${c} has conflicting mappings.`);
    }
    if (usedPlainLetters.has(p) && usedPlainLetters.get(p) !== c) {
      throw new Error(`Plain letter ${p} is assigned to more than one cipher letter.`);
    }
    normalized[c] = p;
    usedPlainLetters.set(p, c);
  }

  return wordList.filter(word => {
    if (typeof word !== "string" || !/^[a-z]+$/i.test(word) || word.length !== cipherPattern.length) {
      return false;
    }

    const candidate = word.toUpperCase();
    const cipherToPlain = new Map();
    const plainToCipher = new Map();

    for (let i = 0; i < cipherPattern.length; i++) {
      const cipher = cipherPattern[i].toUpperCase();
      const plain = candidate[i];

      if (normalized[cipher] && normalized[cipher] !== plain) return false;
      if (cipherToPlain.has(cipher) && cipherToPlain.get(cipher) !== plain) return false;
      if (plainToCipher.has(plain) && plainToCipher.get(plain) !== cipher) return false;

      cipherToPlain.set(cipher, plain);
      plainToCipher.set(plain, cipher);
    }
    return true;
  });
}

module.exports = {
  letterPattern,
  candidatesForPattern,
  filterByMapping
};
