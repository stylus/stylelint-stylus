"use strict"

const coreRule = require("stylelint/lib/rules/block-closing-brace-empty-line-before")
const { wrap } = require("../utils/wrapper-rules/brace-rules")
const ruleName = "stylus/block-closing-brace-empty-line-before"

const rule = wrap(coreRule, {
    originalRuleName: "block-closing-brace-empty-line-before",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description:
                "require or disallow an empty line before the closing brace of blocks.",
            category: "standard",
        },
        fixable: true,
    },
}
