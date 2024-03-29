"use strict"

const { scopedTokens, isSkipToken } = require("../tokens")
const { getLang } = require("../nodes")
const {
    aNPlusBNotationPseudoClasses,
    aNPlusBOfSNotationPseudoClasses,
    linguisticPseudoClasses,
    shadowTreePseudoElements,
} = require("../reference/selector")

module.exports = {
    getSelectorTokens,
    isSelectorToken,
    setSelector,
    isStandardSyntaxTypeSelector,
}

function getSelectorTokens(selectorText) {
    const selectors = []
    let selector = []
    let linebreak = null
    for (const { token, scope } of scopedTokens(selectorText)) {
        if (token.value === "," && scope.level === 0) {
            selector.push(token)
            selectors.push({
                selector,
                separator: token,
            })
            selector = []
            linebreak = null
        } else if (
            token.type === "linebreak" &&
            scope.level === 0 &&
            selector.some((t) => !isSkipToken(t))
        ) {
            selector.push(token)
            linebreak = token
        } else if (linebreak && !isSkipToken(token)) {
            selectors.push({
                selector,
                separator: linebreak,
            })
            selector = []
            linebreak = null
            selector.push(token)
        } else {
            selector.push(token)
        }
    }
    if (selector.length > 0) {
        selectors.push({
            selector,
            separator: null,
        })
    }

    return selectors
}

function isSelectorToken(token) {
    return token && (!isSkipToken(token) || isLinebreak(token))
}

function isLinebreak(token) {
    return token && token.type === "linebreak"
}

function setSelector(node, selector) {
    if (!node.raws.selector) {
        node.raws.selector = {
            value: node.selector,
            raw: node.selector,
        }
    }
    if (getLang(node) === "stylus") {
        node.raws.selector.stylus = selector
    } else {
        node.raws.selector.raw = selector
    }
}

/**
 * Check whether a type selector is standard
 */
function isStandardSyntaxTypeSelector(node) {
    // postcss-selector-parser includes the arguments to nth-child() functions
    // as "tags", so we need to ignore them ourselves.
    // The fake-tag's "parent" is actually a selector node, whose parent
    // should be the :nth-child pseudo node.
    if (node.parent && node.parent.parent) {
        const targetParent = node.parent.parent

        if (targetParent.value && targetParent.type === "pseudo") {
            const normalizedParentName = targetParent.value
                .toLowerCase()
                .replace(/^:+/u, "")

            if (
                aNPlusBNotationPseudoClasses.has(normalizedParentName) ||
                aNPlusBOfSNotationPseudoClasses.has(normalizedParentName) ||
                linguisticPseudoClasses.has(normalizedParentName) ||
                shadowTreePseudoElements.has(normalizedParentName)
            ) {
                return false
            }
        }
    }

    // &-bar is a nesting selector combined with a suffix
    if (node.prev() && node.prev().type === "nesting") {
        return false
    }

    // interpolation
    if (node.value.startsWith("{")) {
        return false
    }

    // Reference combinators like `/deep/`
    if (node.value.startsWith("/") && node.value.endsWith("/")) {
        return false
    }

    return true
}
