"use strict"

const isKeyframeSelector = require("stylelint/lib/utils/isKeyframeSelector")
const optionsMatches = require("stylelint/lib/utils/optionsMatches")
const isCustomElement = require("stylelint/lib/utils/isCustomElement")
let selectors
try {
    selectors = require("stylelint/lib/reference/selectors")
} catch (_e) {
    // ignore
}
if (!selectors) {
    // eslint-disable-next-line node/no-missing-require -- stylelint<14.10
    const keywordSets = require("stylelint/lib/reference/keywordSets")
    const htmlTags = require("html-tags")
    selectors = {
        levelOneAndTwoPseudoElements: keywordSets.levelOneAndTwoPseudoElements,
        htmlTypeSelectors: new Set([
            ...keywordSets.nonStandardHtmlTags,
            ...htmlTags,
        ]),
        aNPlusBNotationPseudoClasses: keywordSets.aNPlusBNotationPseudoClasses,
        aNPlusBOfSNotationPseudoClasses:
            keywordSets.aNPlusBOfSNotationPseudoClasses,
        linguisticPseudoClasses: keywordSets.linguisticPseudoClasses,
        shadowTreePseudoElements: keywordSets.shadowTreePseudoElements,
    }
}

module.exports = {
    isKeyframeSelector,
    optionsMatches,
    isCustomElement,
    selectors,
}
