"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")

const ruleName = "stylus/single-line-comment-no-empty"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "disallow empty single-line comments.",
            category: "recommended",
        },
    },
}

const messages = ruleMessages(ruleName, {
    rejected: "Unexpected empty single-line comment",
})

function rule(expectation, _secondary, _context) {
    return (root, result) => {
        const validOptions = validateOptions(result, ruleName, {
            actual: expectation,
        })

        if (!validOptions) {
            return
        }

        root.walkComments(verifyNode)

        function verifyNode(comment) {
            if (!comment.raws.inline) {
                return
            }

            // To ignore comments that are not empty
            if (comment.text && comment.text.length !== 0) {
                return
            }

            report({
                message: messages.rejected,
                node: comment,
                result,
                ruleName,
            })
        }
    }
}
