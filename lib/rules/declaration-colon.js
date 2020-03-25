"use strict"

const { utils } = require("stylelint")
const styleSearch = require("style-search")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/declaration-colon"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "require or disallow declaration colons.",
        category: "standard",
    },
    fixable: true,
}

const messages = utils.ruleMessages(ruleName, {
    rejected: "Unexpected colon",
    expected: "Expected colon",
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

        root.walkDecls(verifyNode)

        function verifyNode(node) {
            if (node.assignment) {
                // e.g. v = val
                return
            }

            if (inCssLiteral(node)) {
                return
            }
            const between = node.raws.stylusBetween || node.raws.between
            let colonIndex = null
            styleSearch(
                {
                    source: between,
                    target: ":",
                    once: true,
                },
                ({ startIndex }) => {
                    colonIndex = startIndex
                }
            )

            const hasColon = colonIndex != null

            if (expectation === "always") {
                if (hasColon) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    node.raws.stylusBetween = `:${between}`
                    return
                }

                utils.report({
                    message: messages.expected,
                    node,
                    index:
                        (
                            (node.raws &&
                                node.raws.prop &&
                                node.raws.prop.raw) ||
                            node.prop
                        ).length + colonIndex,
                    result,
                    ruleName,
                })
            } else {
                if (!hasColon) {
                    return
                }

                // auto-fix
                if (context.fix) {
                    let newBetween =
                        between.slice(0, colonIndex) +
                        between.slice(colonIndex + 1)
                    if (newBetween === "") {
                        newBetween = " "
                    }
                    node.raws.stylusBetween = newBetween
                    return
                }

                utils.report({
                    message: messages.rejected,
                    node,
                    index: (
                        (node.raws && node.raws.prop && node.raws.prop.raw) ||
                        node.prop
                    ).length,
                    result,
                    ruleName,
                })
            }
        }
    }
}

module.exports = rule
