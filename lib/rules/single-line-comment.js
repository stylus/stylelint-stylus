"use strict"

const {
    utils: { ruleMessages, validateOptions, report },
} = require("stylelint")
const { inCssLiteral } = require("../utils/nodes")

const ruleName = "stylus/single-line-comment"

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "enforces comment style where single-line comments are allowed.",
            category: "standard",
        },
        fixable: true,
    },
}

const messages = ruleMessages(ruleName, {
    expected: "Expected single-line comment",
    rejected: "Unexpected single-line comment",
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

        root.walkComments(verifyNode)

        function verifyNode(comment) {
            // To ignore comments that are empty
            if (!comment.text || comment.text.length === 0) {
                return
            }

            if (expectation === "always") {
                verifyAlways(comment)
            } else {
                verifyNever(comment)
            }
        }

        function verifyAlways(comment) {
            if (comment.raws.inline) {
                return
            }
            if (!canUseInline(comment)) {
                return
            }
            if (context.fix) {
                comment.raws.inline = true
                const text =
                    (comment.raws.left || "") +
                    comment.text +
                    (comment.raws.right || "")
                if (text.includes("\n")) {
                    comment.raws.left = " "
                    comment.text = comment.text.trim()
                    comment.raws.right = ""
                }
                return
            }

            report({
                message: messages.expected,
                node: comment,
                result,
                ruleName,
            })
        }

        function verifyNever(comment) {
            if (!comment.raws.inline) {
                return
            }
            // To ignore comments that are maybe buffered
            // e.g. `//! comment`
            if (comment.text[0] === "!" && !comment.raws.left) {
                return
            }
            // To ignore comments that are triple slash
            // e.g. `/// comment`
            if (comment.text[0] === "/" && !comment.raws.left) {
                return
            }
            if (context.fix) {
                delete comment.raws.inline
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

function canUseInline(comment) {
    // To ignore comments that are contents multiline
    if (comment.text.trim().includes("\n")) {
        return false
    }
    // To ignore comments that are buffered
    // e.g. `/*! comment*/`
    if (comment.text[0] === "!" && !comment.raws.left) {
        return false
    }
    const next = comment.next()
    if (next) {
        const afterText = next.raws.before || ""
        if (!afterText.includes("\n")) {
            return false
        }
    } else if (comment.parent) {
        const parent = comment.parent
        if (comment === parent.last) {
            const afterText = parent.raws.after || ""
            if (!afterText.includes("\n")) {
                return false
            }
        }
    }
    if (inCssLiteral(comment)) {
        return false
    }
    return true
}
