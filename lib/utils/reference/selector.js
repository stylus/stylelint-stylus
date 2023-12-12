"use strict"

const htmlTags = require("html-tags")

function uniteSets(...args) {
    return new Set([...args].reduce((result, set) => [...result, ...set], []))
}

const deprecatedHtmlTypeSelectors = new Set([
    "acronym",
    "applet",
    "basefont",
    "big",
    "blink",
    "center",
    "content",
    "dir",
    "font",
    "frame",
    "frameset",
    "hgroup",
    "isindex",
    "keygen",
    "listing",
    "marquee",
    "nobr",
    "noembed",
    "plaintext",
    "spacer",
    "strike",
    "tt",
    "xmp",
])

/** @type {Set<string>} */
const standardHtmlTypeSelectors = new Set(htmlTags)

const htmlTypeSelectors = uniteSets(
    deprecatedHtmlTypeSelectors,
    standardHtmlTypeSelectors,
)
// These are the ones that can have single-colon notation
const levelOneAndTwoPseudoElements = new Set([
    "before",
    "after",
    "first-line",
    "first-letter",
])
const shadowTreePseudoElements = new Set(["part"])
const aNPlusBNotationPseudoClasses = new Set([
    "nth-column",
    "nth-last-column",
    "nth-last-of-type",
    "nth-of-type",
])
const aNPlusBOfSNotationPseudoClasses = new Set(["nth-child", "nth-last-child"])
const linguisticPseudoClasses = new Set(["dir", "lang"])

module.exports = {
    htmlTypeSelectors,
    levelOneAndTwoPseudoElements,
    shadowTreePseudoElements,
    aNPlusBNotationPseudoClasses,
    aNPlusBOfSNotationPseudoClasses,
    linguisticPseudoClasses,
}
