/**
 * Lightweight American/British English spelling converter.
 * This is a spelling helper, not a full language translator.
 */

const AMERICAN_TO_BRITISH = {
  color: "colour",
  colors: "colours",
  colorful: "colourful",
  favorite: "favourite",
  favorites: "favourites",
  honor: "honour",
  honorable: "honourable",
  humor: "humour",
  labor: "labour",
  neighbor: "neighbour",
  neighbors: "neighbours",
  behavior: "behaviour",
  behaviors: "behaviours",
  organize: "organise",
  organizes: "organises",
  organized: "organised",
  organizing: "organising",
  organization: "organisation",
  organizations: "organisations",
  recognize: "recognise",
  recognized: "recognised",
  recognizing: "recognising",
  realize: "realise",
  realized: "realised",
  analyze: "analyse",
  analyzed: "analysed",
  center: "centre",
  centers: "centres",
  centered: "centred",
  centering: "centring",
  theater: "theatre",
  theaters: "theatres",
  meter: "metre",
  meters: "metres",
  liter: "litre",
  liters: "litres",
  fiber: "fibre",
  fibers: "fibres",
  defense: "defence",
  offense: "offence",
  license: "licence",
  catalog: "catalogue",
  catalogs: "catalogues",
  dialog: "dialogue",
  dialogs: "dialogues",
  traveled: "travelled",
  traveling: "travelling",
  traveler: "traveller",
  travelers: "travellers",
  canceled: "cancelled",
  canceling: "cancelling",
  gray: "grey",
  check: "check",
  airplane: "aeroplane",
  airplanes: "aeroplanes",
  tire: "tyre",
  tires: "tyres",
  curb: "kerb",
  mom: "mum",
  moms: "mums",
  pajamas: "pyjamas",
  jewelry: "jewellery",
  mold: "mould",
  molds: "moulds",
  mustache: "moustache",
  aluminum: "aluminium",
  sulfur: "sulphur"
};

const BRITISH_TO_AMERICAN = Object.fromEntries(
  Object.entries(AMERICAN_TO_BRITISH).map(([american, british]) => [british, american])
);

function replaceWords(text, dictionary) {
  if (typeof text !== "string") {
    throw new TypeError("Input must be a string.");
  }

  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  if (!keys.length) return text;

  const pattern = new RegExp(
    "\\b(" + keys.map(word => word.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")).join("|") + ")\\b",
    "gi"
  );

  return text.replace(pattern, match => {
    const replacement = dictionary[match.toLowerCase()];
    if (!replacement) return match;

    if (match === match.toUpperCase()) return replacement.toUpperCase();
    if (match[0] === match[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  });
}

function toBritishEnglish(text) {
  return replaceWords(text, AMERICAN_TO_BRITISH);
}

function toAmericanEnglish(text) {
  return replaceWords(text, BRITISH_TO_AMERICAN);
}

module.exports = {
  toBritishEnglish,
  toAmericanEnglish,
  AMERICAN_TO_BRITISH,
  BRITISH_TO_AMERICAN
};
