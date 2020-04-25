"use strict"

const _ = require("lodash")
const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/pythonic"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "enforces pythonic or brace style.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expectedBraces: "Expected braces in block",
    expectedPythonic: "Expected 'pythonic' (i.e. indentation-based)",
})

const possibleOptions = ["always", "never"]

function getNodeOption(node, expectation, secondary) {
    if (secondary) {
        const atblock =
            node.type === "atrule" && node.assignment && node.atblock
        if (atblock && secondary.atblock) {
            return secondary.atblock
        }
    }

    return expectation
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
                    atblock: possibleOptions,
                },
                optional: true,
            }
        )

        if (!validOptions) {
            return
        }

        root.walkAtRules(atRule => {
            if (!hasBlock(atRule)) {
                return
            }
            if (atRule.postfix) {
                return
            }

            if (atRule.atblock && !atRule.assignment) {
                // ignore lonely atblock expression
                return
            }

            if (atRule.object) {
                // ignore object expression
                return
            }

            verifyNode(atRule)
        })

        root.walkRules(verifyNode)

        function verifyNode(node) {
            if (!node.nodes || !node.nodes.length) {
                // empty
                return
            }
            if (inCssLiteral(node)) {
                return
            }
            const pythonic = node.pythonic

            const always =
                getNodeOption(node, expectation, secondary) === "always"

            if (always) {
                if (pythonic) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    node.pythonic = true
                    return
                }

                report({
                    message: messages.expectedPythonic,
                    node,
                    index: 0,
                    result,
                    ruleName,
                })
            } else {
                if (!pythonic) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    node.pythonic = false
                    return
                }

                report({
                    message: messages.expectedBraces,
                    node,
                    index: 0,
                    result,
                    ruleName,
                })
            }
        }
    }
}
