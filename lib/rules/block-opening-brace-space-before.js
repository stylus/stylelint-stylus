"use strict"

const coreRule = require("stylelint/lib/rules/block-opening-brace-space-before")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-opening-brace-space-before"

const rule = wrap(coreRule, {
    originalRuleName: "block-opening-brace-space-before",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a single space or disallow whitespace before the opening brace of blocks.",
            category: "standard",
        },
        fixable: true,
    },
}
