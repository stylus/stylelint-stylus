"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/no-at-require"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow `@require`, use `@import` instead.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected '@require', use '@import' instead.",
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        if (root.source.lang !== "stylus") {
            return
        }

        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
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
            if (node.name !== "require") {
                // Non target
                return
            }
            if (node.raws.identifier != null && node.raws.identifier !== "@") {
                // Not atrule
                return
            }
            if (inCssLiteral(node)) {
                return
            }

            // auto-fix
            if (context.fix) {
                node.name = "import"
                return
            }

            report({
                message: messages.rejected,
                node,
                index: 0,
                result,
                ruleName,
            })
        }
    }
}
