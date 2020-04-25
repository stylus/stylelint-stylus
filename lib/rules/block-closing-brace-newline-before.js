"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-newline-before")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-newline-before"

const rule = wrap(coreRule, {
    originalRuleName: "block-closing-brace-newline-before",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a newline or disallow whitespace before the closing brace of blocks.",
            category: "standard",
        },
        fixable: true,
    },
}
