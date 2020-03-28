"use strict"

const isKeyframeSelector = require("stylelint/lib/utils/isKeyframeSelector")
const optionsMatches = require("stylelint/lib/utils/optionsMatches")
const isCustomElement = require("stylelint/lib/utils/isCustomElement")
const keywordSets = require("stylelint/lib/reference/keywordSets")

module.exports = {
    isKeyframeSelector,
    optionsMatches,
    isCustomElement,
    keywordSets,
}
