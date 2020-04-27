"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const { inCssLiteral } = require("../utils/nodes")
const { mediaParser } = require("../utils/media-query")

const ruleName = "stylus/media-feature-colon"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "require or disallow media feature colons.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected colon",
    expected: "Expected colon",
})

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
        const always = expectation === "always"

        root.walkAtRules(verifyNode)

        function verifyNode(node) {
            if (inCssLiteral(node)) {
                return
            }
            if (
                node.name.toLowerCase() !== "media" ||
                (node.raws.identifier != null && node.raws.identifier !== "@")
            ) {
                return
            }

            const params =
                (node.raws.params &&
                    (node.raws.params.stylus || node.raws.params.raw)) ||
                node.params

            const reportIndices = []

            mediaParser(params).walk(
                /^media-feature-expression$/iu,
                mediaFeatureExprNode => {
                    if (always) {
                        if (
                            !mediaFeatureExprNode.nodes.length === 1 ||
                            mediaFeatureExprNode.nodes.some(
                                n => n.type === "colon"
                            )
                        ) {
                            return
                        }
                        const mediaFeatureNode = mediaFeatureExprNode.nodes[0]
                        const values = mediaFeatureNode.value.split(/\s+/gu)
                        if (values.length !== 2) {
                            return
                        }
                        reportIndices.push(
                            mediaFeatureNode.sourceIndex + values[0].length
                        )
                    } else {
                        if (!mediaFeatureExprNode.nodes.length === 3) {
                            return
                        }
                        const colon = mediaFeatureExprNode.nodes.find(
                            n => n.type === "colon"
                        )
                        if (!colon) {
                            return
                        }
                        reportIndices.push(colon.sourceIndex)
                    }
                }
            )

            // auto-fix
            if (context.fix) {
                let fixedParams = params
                for (const index of reportIndices.sort((a, b) => b - a)) {
                    const before = fixedParams.slice(0, index)
                    let after = fixedParams.slice(index)

                    if (always) {
                        after = `:${after}`
                    } else {
                        after = after.replace(/^:/u, "")
                    }
                    fixedParams = before + after
                }
                if (!node.raws.params) {
                    node.raws.params = { value: node.params, raw: node.params }
                }
                node.raws.params.stylus = fixedParams
                return
            }

            for (const reportIndex of reportIndices) {
                report({
                    message: always ? messages.expected : messages.rejected,
                    node,
                    index:
                        node.name.length +
                        (node.raws.afterName || "").length +
                        reportIndex,
                    result,
                    ruleName,
                })
            }
        }
    }
}
