"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral, isObjectProperty } = require("../utils/nodes")

const ruleName = "stylus/semicolon"

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected semicolon",
    expected: "Expected semicolon",
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "require or disallow semicolon.",
            category: "standard",
        },
        fixable: true,
    },
}

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkAtRules(atRule => {
            if (hasBlock(atRule)) {
                return
            }
            verifyNode(atRule)
        })

        root.walkDecls(verifyNode)

        function verifyNode(node) {
            if (inCssLiteral(node)) {
                return
            }
            if (isObjectProperty(node)) {
                return
            }
            const lastNode = findLastNode(node.parent.nodes)
            const isLast = node === lastNode
            const hasSemicolon = isLast
                ? node.parent.raws.semicolon
                : !node.omittedSemi

            if (expectation === "always") {
                if (hasSemicolon) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    if (isLast) {
                        node.parent.raws.semicolon = true
                    } else {
                        node.omittedSemi = false
                    }
                    return
                }

                report({
                    message: messages.expected,
                    node,
                    index: node.toString().trim().length,
                    result,
                    ruleName,
                })
            } else {
                if (!hasSemicolon) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    if (isLast) {
                        node.parent.raws.semicolon = false
                    } else {
                        node.omittedSemi = true
                    }
                    return
                }

                report({
                    message: messages.rejected,
                    node,
                    index: node.toString().trim().length,
                    result,
                    ruleName,
                })
            }
        }
    }
}

function findLastNode(nodes) {
    for (let index = nodes.length - 1; index >= 0; index--) {
        const node = nodes[index]
        if (node.type === "comment") {
            continue
        }
        return node
    }
    return null
}
