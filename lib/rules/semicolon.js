"use strict"

const { utils } = require("stylelint")
const hasBlock = require("stylelint/lib/utils/hasBlock")

const ruleName = "stylus/semicolon"

const messages = utils.ruleMessages(ruleName, {
    rejected: "Unexpected colon",
    expected: "Expected colon",
})

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "requires or disallows semicolon.",
        category: "standard",
    },
    fixable: true,
}
module.exports = rule

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
            if (hasBlock(atRule)) {
                return
            }
            checkNode(atRule)
        })

        root.walkDecls(decl => {
            checkNode(decl)
        })

        function checkNode(node) {
            const isLast = node === node.parent.last
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

                utils.report({
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

                utils.report({
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
