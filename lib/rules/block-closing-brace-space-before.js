"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-space-before")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-space-before"

const rule = wrap(coreRule, {
    originalRuleName: "block-closing-brace-space-before",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a single space or disallow whitespace before the closing brace of blocks.",
            category: "standard",
        },
        fixable: true,
    },
}
