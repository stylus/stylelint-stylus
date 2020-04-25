"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral, isObjectProperty } = require("../utils/nodes")

const ruleName = "stylus/hash-object-property-comma"

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected comma",
    expected: "Expected comma",
})

const possibleOptions = ["always", "never"]

function getNodeOption(_node, isLast, expectation, secondary) {
    if (secondary) {
        if (isLast && secondary.trailing) {
            return secondary.trailing
        }
    }
    return expectation
}

function canOmitComma(node) {
    const parent = node.parent
    const index = parent.nodes.indexOf(node)
    const nextNodes = parent.nodes.slice(index + 1)
    if (
        nextNodes.length &&
        nextNodes.every(
            next => next.raws.before && !next.raws.before.includes("\n") // no line feed
        )
    ) {
        return false
    }
    return true
}

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require or disallow commas in hash object properties.",
            category: "standard",
        },
        fixable: true,
    },
}

function rule(expectation, secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(
            result,
            ruleName,
            {
                actual: expectation,
                possible: possibleOptions,
            },
            {
                actual: secondary,
                possible: {
                    trailing: possibleOptions,
                },
                optional: true,
            }
        )

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
            if (!isObjectProperty(node)) {
                return
            }
            if (!canOmitComma(node)) {
                return
            }
            const lastNode = findLastNode(node.parent.nodes)
            const isLast = node === lastNode
            const hasSemicolon = isLast
                ? node.parent.raws.semicolon
                : !node.omittedSemi

            const always =
                getNodeOption(node, isLast, expectation, secondary) === "always"

            if (always) {
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
