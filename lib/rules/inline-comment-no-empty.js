"use strict"

const { utils } = require("stylelint")

const ruleName = "stylus/inline-comment-no-empty"

rule.ruleName = ruleName
rule.meta = {
    docs: {
        description: "disallow empty inline comments.",
        category: "recommended",
    },
}

const messages = utils.ruleMessages(ruleName, {
    rejected: "Unexpected empty inline comment",
})

function rule(expectation, _secondary, _context) {
    return (root, result) => {
        const validOptions = utils.validateOptions(result, ruleName, {
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

            utils.report({
                message: messages.rejected,
                node: comment,
                result,
                ruleName,
            })
        }
    }
}

module.exports = rule
