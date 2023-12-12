"use strict"

const { isStandardSyntaxSelector } = require("./text")

/** @typedef {import('postcss').Node} Node */
/** @typedef {import('postcss').Source} NodeSource */

const HAS_EMPTY_LINE = /\n[\t\r ]*\n/

module.exports = {
    hasBlock,
    hasEmptyBlock,
    getPreviousNonSharedLineCommentNode,
    hasEmptyLine,
    isAfterComment,
    isSharedLineComment,
    getNextNonSharedLineCommentNode,
    isBlocklessAtRuleAfterBlocklessAtRule,
    isBlocklessAtRuleAfterSameNameBlocklessAtRule,
    isFirstNested,
    isFirstNodeOfRoot,
    isStandardSyntaxAtRule,
    isStandardSyntaxRule,
    declarationValueIndex,
    isStandardSyntaxComment,
    atRuleParamIndex,

    blockString,
    rawNodeString,
    beforeBlockString,
    getDeclarationValue,

    isRoot,
    isRule,
    isAtRule,
    isComment,
    isDeclaration,
    isDocument,
    isValueFunction,
    hasSource,
}

/**
 * Check if a statement has an block (empty or otherwise).
 *
 * @param {import('postcss').Container} statement
 * @return {boolean} True if `statement` has a block (empty or otherwise)
 */
function hasBlock(statement) {
    return statement.nodes !== undefined
}

/**
 * Check if a statement has an empty block.
 *
 * @param {import('postcss').Rule | import('postcss').AtRule} statement - postcss rule or at-rule node
 * @return {boolean} True if the statement has a block and it is empty
 */
function hasEmptyBlock(statement) {
    return hasBlock(statement) && statement.nodes.length === 0
}

/**
 * Check if a string contains at least one empty line
 *
 * @param {string | undefined} string
 * @returns {boolean}
 */
function hasEmptyLine(string) {
    if (string === "" || string === undefined) return false

    return HAS_EMPTY_LINE.test(string)
}

/**
 * @param {Node} node
 */
function getNodeLine(node) {
    return node.source && node.source.start && node.source.start.line
}

/**
 * @param {Node | undefined} node
 * @returns {Node | undefined}
 */
function getPreviousNonSharedLineCommentNode(node) {
    if (node === undefined) {
        return undefined
    }

    const previousNode = node.prev()

    if (!previousNode || previousNode.type !== "comment") {
        return previousNode
    }

    if (getNodeLine(node) === getNodeLine(previousNode)) {
        return getPreviousNonSharedLineCommentNode(previousNode)
    }

    const previousNode2 = previousNode.prev()

    if (
        previousNode2 &&
        getNodeLine(previousNode) === getNodeLine(previousNode2)
    ) {
        return getPreviousNonSharedLineCommentNode(previousNode)
    }

    return previousNode
}

/**
 * @param {import('postcss').Node} node
 */
function isAfterComment(node) {
    const previousNode = node.prev()

    if (!previousNode || previousNode.type !== "comment") {
        return false
    }

    return !isSharedLineComment(previousNode)
}

/** @typedef {import('postcss').Node} PostcssNode */

/**
 *
 * @param {PostcssNode | void} a
 * @param {PostcssNode | void} b
 */
function nodesShareLines(a, b) {
    const endLine = a && a.source && a.source.end && a.source.end.line
    const startLine = b && b.source && b.source.start && b.source.start.line

    return endLine === startLine
}

/**
 * @param {PostcssNode} node
 * @returns {boolean}
 */
function isSharedLineComment(node) {
    if (!isComment(node)) {
        return false
    }

    const previousNonSharedLineCommentNode =
        getPreviousNonSharedLineCommentNode(node)

    if (nodesShareLines(previousNonSharedLineCommentNode, node)) {
        return true
    }

    const nextNonSharedLineCommentNode = getNextNonSharedLineCommentNode(node)

    if (
        nextNonSharedLineCommentNode &&
        nodesShareLines(node, nextNonSharedLineCommentNode)
    ) {
        return true
    }

    const parentNode = node.parent

    // It's a first child and located on the same line as block start
    if (
        parentNode !== undefined &&
        !isRoot(parentNode) &&
        parentNode.index(node) === 0 &&
        node.raws.before !== undefined &&
        !node.raws.before.includes("\n")
    ) {
        return true
    }

    return false
}

/**
 * @param {Node | void} node
 * @returns {Node | void}
 */
function getNextNonSharedLineCommentNode(node) {
    if (node === undefined) {
        return undefined
    }

    /** @type {Node | void} */
    const nextNode = node.next()

    if (!nextNode || nextNode.type !== "comment") {
        return nextNode
    }

    if (
        getNodeLine(node) === getNodeLine(nextNode) ||
        getNodeLine(nextNode) === getNodeLine(nextNode.next())
    ) {
        return getNextNonSharedLineCommentNode(nextNode)
    }

    return nextNode
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').Root}
 */
function isRoot(node) {
    return node.type === "root"
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').Rule}
 */
function isRule(node) {
    return node.type === "rule"
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').AtRule}
 */
function isAtRule(node) {
    return node.type === "atrule"
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').Comment}
 */
function isComment(node) {
    return node.type === "comment"
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').Declaration}
 */
function isDeclaration(node) {
    return node.type === "decl"
}

/**
 * @param {Node} node
 * @returns {node is import('postcss').Document}
 */
function isDocument(node) {
    return node.type === "document"
}

/**
 * @param {import('postcss-value-parser').Node} node
 * @returns {node is import('postcss-value-parser').FunctionNode}
 */
function isValueFunction(node) {
    return node.type === "function"
}

/**
 * @param {Node} node
 * @returns {node is (Node & {source: NodeSource})}
 */
function hasSource(node) {
    return Boolean(node.source)
}

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
function isBlocklessAtRuleAfterBlocklessAtRule(atRule) {
    if (atRule.type !== "atrule") {
        return false
    }

    const previousNode = getPreviousNonSharedLineCommentNode(atRule)

    if (previousNode === undefined) {
        return false
    }

    return (
        isAtRule(previousNode) && !hasBlock(previousNode) && !hasBlock(atRule)
    )
}

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {boolean}
 */
function isBlocklessAtRuleAfterSameNameBlocklessAtRule(atRule) {
    if (!isBlocklessAtRuleAfterBlocklessAtRule(atRule)) {
        return false
    }

    const previousNode = getPreviousNonSharedLineCommentNode(atRule)

    if (previousNode && isAtRule(previousNode)) {
        return previousNode.name === atRule.name
    }

    return false
}

/**
 * @param {import('postcss').Node} statement
 * @returns {boolean}
 */
function isFirstNested(statement) {
    const parentNode = statement.parent

    if (parentNode === undefined) {
        return false
    }

    if (isRoot(parentNode) && !isInDocument(parentNode)) {
        return false
    }

    if (statement === parentNode.first) {
        return true
    }

    // Search for the statement in the parent's nodes, ignoring comment
    // nodes on the same line as the parent's opening brace.

    const parentNodes = parentNode.nodes

    if (!parentNodes) {
        return false
    }

    const firstNode = parentNodes[0]

    if (!firstNode) {
        return false
    }

    if (
        !isComment(firstNode) ||
        (typeof firstNode.raws.before === "string" &&
            firstNode.raws.before.includes("\n"))
    ) {
        return false
    }

    if (!hasSource(firstNode) || !firstNode.source.start) {
        return false
    }

    const openingBraceLine = firstNode.source.start.line

    if (
        !firstNode.source.end ||
        openingBraceLine !== firstNode.source.end.line
    ) {
        return false
    }

    for (const [index, node] of parentNodes.entries()) {
        if (index === 0) {
            continue
        }

        if (node === statement) {
            return true
        }

        if (
            !isComment(node) ||
            (hasSource(node) &&
                node.source.end &&
                node.source.end.line !== openingBraceLine)
        ) {
            return false
        }
    }

    /* istanbul ignore next: Should always return in the loop */
    return false
}

/**
 * @param {import('postcss').Node} node
 * @returns {boolean}
 */
function isInDocument({ parent }) {
    return Boolean(parent && isDocument(parent))
}

/**
 * @param {import('postcss').Node} node
 * @returns {boolean}
 */
function isFirstNodeOfRoot(node) {
    if (isRoot(node)) return false

    const parentNode = node.parent

    if (!parentNode) {
        return false
    }

    return isRoot(parentNode) && node === parentNode.first
}

/**
 * Check whether a at-rule is standard
 *
 * @param {import('postcss').AtRule | import('postcss-less').AtRule} atRule postcss at-rule node
 * @return {boolean} If `true`, the declaration is standard
 */
function isStandardSyntaxAtRule(atRule) {
    // Ignore scss `@content` inside mixins
    if (!atRule.nodes && atRule.params === "") {
        return false
    }

    // Ignore Less mixins
    if ("mixin" in atRule && atRule.mixin) {
        return false
    }

    // Ignore Less detached ruleset `@detached-ruleset: { background: red; }; .top { @detached-ruleset(); }`
    if (
        ("variable" in atRule && atRule.variable) ||
        (!atRule.nodes &&
            atRule.raws.afterName === "" &&
            atRule.params[0] === "(")
    ) {
        return false
    }

    return true
}

/**
 * Check whether a Node is a standard rule
 *
 * @param {import('postcss').Rule | import('postcss-less').Rule} rule
 * @returns {boolean}
 */
function isStandardSyntaxRule(rule) {
    if (rule.type !== "rule") {
        return false
    }

    // Ignore Less &:extend rule
    if ("extend" in rule && rule.extend) {
        return false
    }

    if (!isStandardSyntaxSelector(rule.selector)) {
        return false
    }

    return true
}

/**
 * Return a CSS statement's block -- the string that starts and `{` and ends with `}`.
 *
 * If the statement has no block (e.g. `@import url(foo.css);`), returns an empty string.
 *
 * @param {import('postcss').Container} statement
 * @returns {string}
 */
function blockString(statement) {
    if (!hasBlock(statement)) {
        return ""
    }

    return rawNodeString(statement).slice(beforeBlockString(statement).length)
}

/**
 * Stringify PostCSS node including its raw "before" string.
 *
 * @param {import('postcss').Node} node
 *
 * @returns {string}
 */
function rawNodeString(node) {
    let result = ""

    if (node.raws.before) {
        result += node.raws.before
    }

    result += node.toString()

    return result
}

/**
 * @param {import('postcss').Container} statement
 * @returns {string}
 */
function beforeBlockString(
    statement,
    { noRawBefore } = { noRawBefore: false },
) {
    let result = ""

    const before = statement.raws.before || ""

    if (!noRawBefore) {
        result += before
    }

    if (isRule(statement)) {
        result += statement.selector
    } else if (isAtRule(statement)) {
        result += `@${statement.name}${statement.raws.afterName || ""}${
            statement.params
        }`
    } else {
        return ""
    }

    result += statement.raws.between || ""

    return result
}

/**
 * @param {import('postcss').Declaration} decl
 * @returns {string}
 */
function getDeclarationValue(decl) {
    const raws = decl.raws

    return (raws.value && raws.value.raw) || decl.value
}

function isObject(value) {
    return value !== null && typeof value === "object"
}

/**
 * Get the index of a declaration's value
 *
 * @param {import('postcss').Declaration} decl
 * @returns {number}
 */
function declarationValueIndex(decl) {
    const raws = decl.raws
    const prop = raws.prop

    return [
        isObject(prop) && "prefix" in prop && prop.prefix,
        (isObject(prop) && "raw" in prop && prop.raw) || decl.prop,
        isObject(prop) && "suffix" in prop && prop.suffix,
        raws.between || ":",
        raws.value && "prefix" in raws.value && raws.value.prefix,
    ].reduce((/** @type {number} */ count, str) => {
        if (typeof str === "string") {
            return count + str.length
        }

        return count
    }, 0)
}

/**
 * @param {import('postcss').Comment} comment
 * @returns {boolean}
 */
function isStandardSyntaxComment(comment) {
    // We check both here because the Sass parser uses `raws.inline` to indicate
    // inline comments, while the Less parser uses `inline`.
    if ("inline" in comment) return false

    if ("inline" in comment.raws) return false

    return true
}

/**
 * @param {import('postcss').AtRule} atRule
 * @returns {number}
 */
function atRuleParamIndex(atRule) {
    // Initial 1 is for the `@`
    let index = 1 + atRule.name.length

    if (atRule.raws.afterName) {
        index += atRule.raws.afterName.length
    }

    return index
}
