"use strict"

const selectorParser = require("./parser/stylus-selector-parser")

/**
 * @param {string} selector
 * @param {import('stylelint').PostcssResult} result
 * @param {import('postcss').Node} node
 * @param {Function} cb
 */
module.exports = function parseSelector(selector, result, node, cb) {
    try {
        return selectorParser(cb).processSync(selector)
    } catch (_e) {
        result.warn("Cannot parse selector", {
            node,
            stylelintType: "parseError",
        })
        return selector
    }
}
