"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")

const ruleName = "stylus/single-line-comment-double-slash-space-after"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require or disallow whitespace after the double-slash of single-line comments.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expected: 'Expected whitespace after "//"',
    rejected: 'Unexpected whitespace after "//"',
})

function rule(expectation, _secondary, context) {
    return (root, result) => {
        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
            possible: ["always", "never"],
        })

        if (!validOptions) {
            return
        }

        root.walkComments(verifyNode)

        function verifyNode(comment) {
            if (!comment.raws.inline) {
                return
            }

            // To ignore comments that are empty
            if (!comment.text || comment.text.length === 0) {
                return
            }

            const commentLeft = comment.raws.left || ""
            const hasSpace = /^\s/u.test(commentLeft)
            if (expectation === "always") {
                if (hasSpace) {
                    return
                }

                if (context.fix) {
                    comment.raws.left = ` ${commentLeft}`
                    return
                }

                report({
                    message: messages.rejected,
                    node: comment,
                    index: 2,
                    result,
                    ruleName,
                })
            } else {
                if (!hasSpace) {
                    return
                }

                if (context.fix) {
                    comment.raws.left = commentLeft.replace(/^\s+/u, "")
                    return
                }

                report({
                    message: messages.expected,
                    node: comment,
                    index: 2,
                    result,
                    ruleName,
                })
            }
        }
    }
}
