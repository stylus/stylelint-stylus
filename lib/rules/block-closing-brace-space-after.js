"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-space-after")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-space-after"

const rule = wrap(coreRule, {
    originalRuleName: "block-closing-brace-space-after",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require a single space or disallow whitespace after the closing brace of blocks.",
            category: "standard",
        },
    },
}
