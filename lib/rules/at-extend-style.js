"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/at-extend-style"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "enforces `@extend` style.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    extend: "Expected '@extend' instead of '@extends'",
    extends: "Expected '@extends' instead of '@extend'",
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["@extend", "@extends"],
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

        function verifyNode(node) {
            if (node.name !== "extend" && node.name !== "extends") {
                // Non target atrule
                return
            }
            if (node.raws.identifier != null && node.raws.identifier !== "@") {
                // Not atrule
                return
            }
            if (inCssLiteral(node)) {
                return
            }
            const actual = node.name
            const expected = expectation.slice(1)

            if (actual !== expected) {
                // auto-fix
                if (context.fix) {
                    node.name = expected
                    return
                }

                report({
                    message: messages[expected],
                    node,
                    index: 0,
                    result,
                    ruleName,
                })
            }
        }
    }
}
