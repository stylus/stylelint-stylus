"use strict"

/// @ts-check
const selectorParser = require("postcss-selector-parser")
const { replaceSelector, restoreReplacedSelector } = require("./replace-utils")

/**
 * @typedef { import("postcss-selector-parser").Root } Root
 * @typedef { import("postcss-selector-parser").Attribute } Attribute
 * @typedef { import("postcss-selector-parser").Node } Node
 */
/**
 * @template Transform
 * @typedef { import("postcss-selector-parser").SyncProcessor<Transform> } SyncProcessor<Transform>
 */
/**
 * Replace stylus nesting node
 * @param {RegExpExecArray} _result
 * @param {string} random
 * @returns {string}
 */
function replaceStylusNesting(_result, random) {
    return `[${random}]`
}

/**
 * Restore stylus nesting node
 * @param {Node} attribute
 * @param {string} random
 * @param {string} original
 * @returns {Node | null}
 */
function restoreStylusNesting(attribute, random, original) {
    if (attribute.type !== "attribute") {
        return null
    }
    if (!attribute.attribute.includes(random)) {
        return null
    }
    const node = selectorParser.nesting({ ...attribute })
    node.value = original
    return node
}

/**
 * @template Transform
 * @param {SyncProcessor<Transform>} cb
 */
module.exports = cb => ({
    /**
     * @param {string} selector
     * @returns {string}
     */
    processSync(selector) {
        return processSync(cb, selector)
    },
})

/**
 * @template Transform
 * @param {SyncProcessor<Transform>} cb
 * @param {string} selector
 * @returns {string}
 */
function processSync(cb, selector) {
    const root = stylusSelectorParser(selector)
    cb(root)
    // override toString
    root.toString = function() {
        let str = ""
        let lastNode = null
        for (const node of root.nodes) {
            if (str) {
                /// @ts-ignore
                if (lastNode && lastNode.separateLf) {
                    str = `${str}${node}`
                } else {
                    str = `${str},${node}`
                }
            } else {
                str = `${node}`
            }
            lastNode = node
        }
        /// @ts-ignore
        return this.trailingComma ? `${str},` : str
    }
    return root.toString()
}

/**
 * @param {string} selector
 * @returns {Root}
 */
function stylusSelectorParser(selector) {
    const replaceSelectorContext = replaceSelector(
        selector,
        [
            {
                regexp: /\{(?:[\s\S]+?)\}/gu, // interpolation
                replace: (_res, random) => `_${random}_`,
            },
            {
                regexp: /\^\[(?:[\s\S]+?)\]/gu, // partial reference
                replace: replaceStylusNesting,
                restore: restoreStylusNesting,
            },
            {
                regexp: /~\//gu, // initial reference
                replace: replaceStylusNesting,
                restore: restoreStylusNesting,
            },
            {
                regexp: /(?:\.\.\/)+/gu, // relative reference
                replace: replaceStylusNesting,
                restore: restoreStylusNesting,
            },
            {
                regexp: /\//gu, // root reference
                replace: replaceStylusNesting,
                restore: restoreStylusNesting,
            },
        ],
        [
            {
                regexp: /\/\/[^\r\n\u2028\u2029]*/gu, // inline comment
                replace: (_res, random) => `/*${random}*/`,
            },
        ],
        [
            {
                regexp: /([\r\n\u2028\u2029])(\s*)/gu, // newline
                replace(res, random, { beforeCss }) {
                    const before = [...beforeCss]
                    let prev = before.pop()
                    while (
                        prev != null &&
                        (prev.startsWith("/*") || !prev.trim())
                    ) {
                        // skip comments
                        prev = before.pop()
                    }
                    if (prev && prev.trim().endsWith(",")) {
                        return res[0]
                    }
                    let after = selector.slice(res.index)
                    let next = null
                    while (
                        (next = after
                            .replace(/^\s*\/\/[^\r\n\u2028\u2029]*\s*/gu, "")
                            .replace(/^\s*\/\*(?:[\s\S]+?)\*\/\s*/gu, "")
                            .trim()) &&
                        next !== after
                    ) {
                        // skip comments
                        after = next
                    }
                    if (after.startsWith(",")) {
                        return res[0]
                    }
                    return `${res[1]}.${random},${res[2]}`
                },
                restore(node, random, _original) {
                    if (
                        node.type !== "class" ||
                        node.value !== random ||
                        !node.parent
                    ) {
                        return null
                    }
                    // @ts-ignore
                    node.parent.separateLf = true
                    return false // remove
                },
            },
        ]
    )

    const result = selectorParser().astSync(replaceSelectorContext.cssSelector)
    if (!replaceSelectorContext.hasReplace()) {
        return result
    }
    /// @ts-ignore
    return restoreReplacedSelector(result, replaceSelectorContext)
}
