/**
 * American–British English Translator
 * Website: https://codewordsolvers.uk/
 */

const americanToBritish = {
  color: "colour",
  favorite: "favourite",
  honor: "honour",
  humor: "humour",
  labor: "labour",
  neighbor: "neighbour",
  behavior: "behaviour",
  organize: "organise",
  recognize: "recognise",
  realize: "realise",
  center: "centre",
  theater: "theatre",
  meter: "metre",
  liter: "litre",
  gray: "grey",
  airplane: "aeroplane",
  tire: "tyre",
  jewelry: "jewellery",
  mold: "mould",
  aluminum: "aluminium",
  pajamas: "pyjamas"
};

const britishToAmerican = Object.fromEntries(
  Object.entries(americanToBritish).map(
    ([american, british]) => [british, american]
  )
);

function convertText(text, dictionary) {
  if (typeof text !== "string") {
    throw new TypeError("Input must be a string.");
  }

  return text.replace(/\b[\w'-]+\b/g, word => {
    const replacement = dictionary[word.toLowerCase()];

    if (!replacement) return word;

    if (word === word.toUpperCase()) {
      return replacement.toUpperCase();
    }

    if (word[0] === word[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }

    return replacement;
  });
}

function toBritishEnglish(text) {
  return convertText(text, americanToBritish);
}

function toAmericanEnglish(text) {
  return convertText(text, britishToAmerican);
}

module.exports = {
  toBritishEnglish,
  toAmericanEnglish
};
