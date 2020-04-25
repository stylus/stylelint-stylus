"use strict"

const coreRule = require("stylelint/lib/rules/at-rule-empty-line-before")
const { wrap } = require("../utils/wrapper-rules/atrule-name-rules")
const ruleName = "stylus/at-rule-empty-line-before"

const rule = wrap(coreRule, {
    originalRuleName: "at-rule-empty-line-before",
    ruleName,
})

module.exports = {
    ruleName,
    rule,
    meta: {
        docs: {
            description: "require or disallow an empty line before at-rules.",
            category: "standard",
        },
        fixable: true,
    },
}
