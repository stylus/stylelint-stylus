"use strict"

const mathMLTags = require("mathml-tag-names")
const svgTags = require("svg-tags")
const { htmlTypeSelectors } = require("./reference/selector")
const keyframeSelectorKeywords = new Set(["from", "to"])

const HAS_LESS_INTERPOLATION = /@\{.+?\}/
const HAS_PSV_INTERPOLATION = /\$\(.+?\)/
const HAS_SCSS_INTERPOLATION = /#\{.+?\}/
const HAS_TPL_INTERPOLATION = /\{.+?\}/

module.exports = {
    isSingleLineString,
    isWhitespace,
    isOnlyWhitespace,
    isKeyframeSelector,
    isCustomElement,
    isStandardSyntaxSelector,
    hasInterpolation,
}

function isSingleLineString(input) {
    return !/[\n\r]/u.test(input)
}

/**
 * Returns a Boolean indicating whether the input string is only whitespace.
 *
 * @param {string} input
 * @returns {boolean}
 */
function isOnlyWhitespace(input) {
    for (const element of input) {
        if (!isWhitespace(element)) {
            return false
        }
    }

    return true
}

/**
 * Check if a character is whitespace.
 *
 * @param {string} char
 * @returns {boolean}
 */
function isWhitespace(char) {
    return [" ", "\n", "\t", "\r", "\f"].includes(char)
}

/**
 * Check whether a string is a keyframe selector.
 *
 * @param {string} selector
 * @returns {boolean}
 */
function isKeyframeSelector(selector) {
    if (keyframeSelectorKeywords.has(selector)) {
        return true
    }

    // Percentages
    if (/^(?:\d+|\d*\.\d+)%$/.test(selector)) {
        return true
    }

    return false
}

function isCustomElement(selector) {
    if (!/^[a-z]/.test(selector)) {
        return false
    }

    if (!selector.includes("-")) {
        return false
    }

    const selectorLowerCase = selector.toLowerCase()

    if (selectorLowerCase !== selector) {
        return false
    }

    if (svgTags.includes(selectorLowerCase)) {
        return false
    }

    if (htmlTypeSelectors.has(selectorLowerCase)) {
        return false
    }

    if (mathMLTags.includes(selectorLowerCase)) {
        return false
    }

    return true
}

/**
 * Check whether a selector is standard
 *
 * @param {string} selector
 * @returns {boolean}
 */
function isStandardSyntaxSelector(selector) {
    // SCSS or Less interpolation
    if (hasInterpolation(selector)) {
        return false
    }

    // SCSS placeholder selectors
    if (selector.startsWith("%")) {
        return false
    }

    // SCSS nested properties
    if (selector.endsWith(":")) {
        return false
    }

    // Less :extend()
    if (/:extend(?:\(.*?\))?/.test(selector)) {
        return false
    }

    // Less mixin with resolved nested selectors (e.g. .foo().bar or .foo(@a, @b)[bar])
    if (/\.[\w-]+\(.*\).+/.test(selector)) {
        return false
    }

    // Less non-outputting mixin definition (e.g. .mixin() {})
    if (selector.endsWith(")") && !selector.includes(":")) {
        return false
    }

    // Less Parametric mixins (e.g. .mixin(@variable: x) {})
    if (/\(@.*\)$/.test(selector)) {
        return false
    }

    // ERB template tags
    if (selector.includes("<%") || selector.includes("%>")) {
        return false
    }

    //  SCSS and Less comments
    if (selector.includes("//")) {
        return false
    }

    return true
}

/**
 * Check whether a string has interpolation
 *
 * @param {string} string
 * @return {boolean} If `true`, a string has interpolation
 */
function hasInterpolation(string) {
    // SCSS or Less interpolation
    if (
        hasLessInterpolation(string) ||
        hasScssInterpolation(string) ||
        hasTplInterpolation(string) ||
        hasPsvInterpolation(string)
    ) {
        return true
    }

    return false
}

/**
 * Check whether a string has less interpolation
 *
 * @param {string} string
 * @return {boolean} If `true`, a string has less interpolation
 */
function hasLessInterpolation(string) {
    return HAS_LESS_INTERPOLATION.test(string)
}

/**
 * Check whether a string has postcss-simple-vars interpolation
 *
 * @param {string} string
 */
function hasPsvInterpolation(string) {
    return HAS_PSV_INTERPOLATION.test(string)
}

/**
 * Check whether a string has scss interpolation
 *
 * @param {string} string
 */
function hasScssInterpolation(string) {
    return HAS_SCSS_INTERPOLATION.test(string)
}

/**
 * Check whether a string has JS template literal interpolation or HTML-like template
 *
 * @param {string} string
 * @return {boolean} If `true`, a string has template literal interpolation
 */
function hasTplInterpolation(string) {
    return HAS_TPL_INTERPOLATION.test(string)
}
