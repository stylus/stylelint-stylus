"use strict"

const { utils } = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/pythonic"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "enforces pythonic or brace style.",
        category: "standard",
    },
    fixable: true,
}

const messages = utils.ruleMessages(ruleName, {
    rejected: "Expected braces",
    expected: "Expected pythonic (i.e. indentation-based)",
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = utils.validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkAtRules(atRule => {
            if (!hasBlock(atRule)) {
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

            if (expectation === "always") {
                if (pythonic) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    node.pythonic = true
                    return
                }

                utils.report({
                    message: messages.expected,
                    node,
                    index: -1,
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

                utils.report({
                    message: messages.rejected,
                    node,
                    index: -1,
                    result,
                    ruleName,
                })
            }
        }
    }
}

module.exports = rule
